// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernanceToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18; // Total supply
    uint256 public proposalCount;

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 indexed id, address indexed proposer, string description);
    event Voted(uint256 indexed id, address indexed voter, bool inSupport);
    event ProposalExecuted(uint256 indexed id, address indexed executor);

    constructor() ERC20("GovernanceToken", "GOV") {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function createProposal(string memory _description) external {
        require(balanceOf(msg.sender) > 0, "Insufficient tokens to create a proposal");
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.description = _description;

        emit ProposalCreated(proposalCount, msg.sender, _description);
    }

    function vote(uint256 _id, bool _inSupport) external {
        require(_id <= proposalCount && _id > 0, "Invalid proposal ID");

        Proposal storage proposal = proposals[_id];
        require(!proposal.executed, "Proposal has already been executed");
        
        if (_inSupport) {
            proposal.votesFor += balanceOf(msg.sender);
        } else {
            proposal.votesAgainst += balanceOf(msg.sender);
        }

        emit Voted(_id, msg.sender, _inSupport);
    }

    function executeProposal(uint256 _id) external onlyOwner {
        require(_id <= proposalCount && _id > 0, "Invalid proposal ID");

        Proposal storage proposal = proposals[_id];
        require(!proposal.executed, "Proposal has already been executed");

        if (proposal.votesFor > proposal.votesAgainst) {
            // Execute proposal actions
            // (This is a placeholder; implement your governance actions here)
            
            proposal.executed = true;
            emit ProposalExecuted(_id, msg.sender);
        }
    }
}

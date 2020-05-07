pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampagins;
    
    function createCampaign(uint minimun) public {
        address newCampaign = new Campaign(minimun, msg.sender);
        deployedCampagins.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampagins;
    }
}

contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address => bool)approvals;
        uint approvalsCount;
    }
    
    Request[] public request;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approversCount++;
        
        approvers[msg.sender] = true;
    }
    
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalsCount: 0
        });
        
        request.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage req = request[index];
        
        require(approvers[msg.sender]);
        require(!req.approvals[msg.sender]);
        
        req.approvals[msg.sender] = true;
        req.approvalsCount++;
    }
    
    
    function finalizeRequest(uint index) public restricted {
        Request storage req = request[index];

        require(req.approvalsCount > (approversCount / 2));
        require(!req.complete);

        req.recipient.transfer(req.value);
        req.complete = true;
    }
}
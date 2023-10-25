// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//Safe Math Interface

library SafeMath {

  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    if (a == 0) {
      return 0;
    }
    c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}

interface ERC20Interface {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint balance);

    function transfer(address recipient, uint amount) external returns (bool success);

    function allowance(address owner, address spender) external view returns (uint remaining);

    function approve(address spender, uint amount) external returns (bool success);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool success);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

// Contrato para chamar quando alguém aprova uma transferência de tokens para um contrato específico
interface ApproveAndCallFallBack {
    function receiveApproval(address from, uint256 tokens, address token, bytes memory data) external;
}

contract myToken is ERC20Interface {
    using SafeMath for uint256;

    string public symbol;
    string public name;
    uint8 public decimals;
    uint public _totalSupply;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    constructor() {
        symbol = "HJK";
        name = "Token HJK";
        decimals = 2;
        _totalSupply = 100000;
        balances[0x26F44aBBbd1547aac7EB4deDdde38C3f69Ed300d] = _totalSupply;
        emit Transfer(address(0), 0x26F44aBBbd1547aac7EB4deDdde38C3f69Ed300d, _totalSupply);
    }

    //Retorna o fornecimento total de tokens do contrato
    function totalSupply() public view override returns (uint) {
        return _totalSupply - balances[address(0)];
    }

    // Retorna o saldo de tokens detidos pelo enderço owner
    function balanceOf(address tokenOwner) public view override returns (uint balance) {
        return balances[tokenOwner];
    }

    // enviar uma quantidade de tokens para endereço "to"
    function transfer(address to, uint tokens) public override returns (bool success) {
        require(balances[msg.sender] >= tokens, "Saldo insuficiente");
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    // proprietário dos tokens aprove um endereço específico (spender) a gastar uma quantidade especificada de tokens em seu nome
    function approve(address spender, uint tokens) public override returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    // Permite que o contrato do token mova tokens da conta de um remetente (from) para a conta de um destinatário (to)
    function transferFrom(address from, address to, uint tokens) public override returns (bool success) {
        require(balances[msg.sender] >= tokens, "Saldo insuficiente");
        require(allowed[from][msg.sender] >= tokens, "Permissao Insuficiente");

        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);

        emit Transfer(from, to, tokens);
        return true;
    }

    //Retorna a quantidade de tokens que um endereço (spender) está autorizado a gastar em nome de outro endereço (tokenOwner)
    function allowance(address tokenOwner, address spender) public view override returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    // Permite que o remetente aprove um endereço (spender) a gastar uma quantidade específica de tokens em seu nome
    function approveAndCall(address spender, uint tokens, bytes memory data) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        ApproveAndCallFallBack(spender).receiveApproval(msg.sender, tokens, address(this), data);
        return true;
    }

    // Permite que o proprietário do contrato (quem o implantou) crie novos tokens, adicionando-os ao saldo do contrato
    function mint(uint amount) external {
        balances[msg.sender] = balances[msg.sender].add(amount);
        _totalSupply = _totalSupply.add(amount);
        emit Transfer(address(0), msg.sender, amount);
    }

    //Permite que o proprietário do contrato destrua tokens, removendo-os do saldo do contrato
    function burn(uint amount) external {
        balances[msg.sender] = balances[msg.sender].sub(amount);
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(msg.sender, address(0), amount);
    }

    // rejeitar todas as transferências de Ether que não correspondam a nenhuma função específica do contrato
    receive() external payable {
        revert();
     }
}

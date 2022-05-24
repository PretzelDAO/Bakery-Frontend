# State Machine for Messages

The below diagram shows the flow and connection of message nodes with corresponding inputs (outputs currently not shown). To display the flow chart use a mermaid.js markdown preview extension in VS-Code.

::: mermaid
graph TD;
landing_page-- Enter --> welcomeMessage;

    %%%%%%%%%%%%%%%%%%%%%%
    %% Welcome Message Nodes
    welcomeMessage-- Free Pretzel & Wallet Connected & No free Pretzel, yet -->firstFreePretzelMessage;
    welcomeMessage-- Free Pretzel & Wallet Connected & No free Pretzel, yet -->freePretzelMessage;
    welcomeMessage-- Free Pretzel & Wallet not Connected -->connectWalletPolygonMessage;
    welcomeMessage-- Special Pretzel & Special Pretzels still available & Wallet Connected -->specialPretzelMessage1;
    welcomeMessage-- Special Pretzel & Special Pretzels still available & Wallet not Connected -->connectWalletEthereumMessage;
    welcomeMessage-- Special Pretzel & Special Pretzels not available --> specialPretzelsSoldOutMessage

    mainMenuMessage-- Free Pretzel & Wallet Connected & No free Pretzel, yet -->firstFreePretzelMessage;
    mainMenuMessage-- Free Pretzel & Wallet Connected & No free Pretzel, yet -->freePretzelMessage;
    mainMenuMessage-- Free Pretzel & Wallet not Connected -->connectWalletPolygonMessage;
    mainMenuMessage-- Special Pretzel & Wallet Connected -->specialPretzelMessage1;
    mainMenuMessage-- Special Pretzel & Wallet not Connected -->connectWalletEthereumMessage;

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Free Pretzel Mint Experience Nodes

    firstFreePretzelMessage-- Claim Pretzel -->freePretzelMessage2;
    firstFreePretzelMessage-- Abort! -->mainMenuMessage;

    freePretzelMessage-- Yes -->freePretzelMessage2;
    freePretzelMessage-- No -->mainMenuMessage;

    freePretzelMessage2-- Yes --> mainMenuMessage;
    freePretzelMessage2-- No --> mainMenuMessage;

    connectWalletPolygonMessage-- Connect Metamask & No Metamask -->mainMenuMessage
    connectWalletPolygonMessage-- Connect Metamask & No not Polygon Network -->changeChainPolygonMessage
    connectWalletPolygonMessage-- Connect Metamask & Success -->freePretzelMessage
    connectWalletPolygonMessage-- What is a Wallet? -->whatIsAWalletMessage

    changeChainPolygonMessage-- Change to Polygon! -->freePretzelMessage
    changeChainPolygonMessage-- What is a Chain? -->whatIsAChainMessage


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Special Pretzel Minting Experience Nodes
    specialPretzelMessage1-- Buy --> specialPretzelMessage2;
    specialPretzelMessage1-- No --> mainMeneMessage;

    specialPretzelMessage2-- Yes --> specialPretzelMessage3;
    specialPretzelMessage2-- No --> specialPretzelMessage3;

    connectWalletEthereumMessage-- Connect Metamask & No Metamask -->mainMenuMessage
    connectWalletEthereumMessage-- Connect Metamask & No not Ethereum Network -->changeChainEthereumMessage
    connectWalletEthereumMessage-- Connect Metamask & Success -->specialPretzelMessage1
    connectWalletEthereumMessage-- What is a Wallet? -->whatIsAWalletMessage

    changeChainEthereumMessage-- Change to Ethereum! -->specialPretzelMessage1
    changeChainEthereumMessage-- What is a Chain? -->whatIsAChainMessage


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Failure Nodes
    somethingWentWrongWhileMintingMessage-- Try Again -->mainMenuMessage
    somethingWentWrongWhileMintingMessage-- Never Mind -->startScreen

    specialPretzelsSoldOutMessage-- View on Opensea -->mainMenuMessage
    specialPretzelsSoldOutMessage-- I am good -->mainMenuMessage

    userDidNotSignTransactionSpecialPretzelMessage-- Try again -->specialPretzelMessage1
    userDidNotSignTransactionSpecialPretzelMessage-- Abort! -->mainMenuMessage

    userDidNotSignTransactionFreePretzelMessage-- Try again -->freePretzelMessage
    userDidNotSignTransactionFreePretzelMessage-- Abort! -->mainMenuMessage

:::
:::

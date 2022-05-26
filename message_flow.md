# State Machine for Messages

The below diagram shows the flow and connection of message nodes with corresponding inputs (outputs currently not shown). To display the flow chart use a mermaid.js markdown preview extension in VS-Code.

::: mermaid
graph TD;
landing_page-- Enter --> welcomeMessage;

    %%%%%%%%%%%%%%%%%%%%%%
    %% Welcome Message Nodes
    welcomeMessage-- Free Pretzel & Wallet Connected & Mint Gasless, yet -->firstFreePretzelMessage;
    welcomeMessage-- Free Pretzel & Wallet Connected & No mint Gasless -->freePretzelMessage;
    welcomeMessage-- Free Pretzel & Wallet not Connected -->connectWalletPolygonMessage;
    welcomeMessage-- Genesis Pretzel & Not sold out & Wallet Connected -->specialPretzelMessage1;
    welcomeMessage-- Genesis Pretzel & Not sold out & Wallet not Connected -->connectWalletEthereumMessage;
    welcomeMessage-- Genesis Pretzel & Sold Out --> specialPretzelsSoldOutMessage;

    mainMenuMessage-- Free Pretzel & Wallet Connected & Mint Gasless, yet -->firstFreePretzelMessage;
    mainMenuMessage-- Free Pretzel & Wallet Connected & No mint Gasless -->freePretzelMessage;
    mainMenuMessage-- Free Pretzel & Wallet not Connected -->connectWalletPolygonMessage;
    mainMenuMessage-- Genesis Pretzel & Not sold out & Wallet Connected -->specialPretzelMessage1;
    mainMenuMessage-- Genesis Pretzel & Not sold out & Wallet not Connected -->connectWalletEthereumMessage;
    mainMenuMessage-- Genesis Pretzel & Sold Out --> specialPretzelsSoldOutMessage;
    mainMenuMessage-- Leave Shop --> landing_page;

    %%%%%%%%%%%%%%%%%%%%%%
    %% Content Helper

    whatIsAWalletMessage-- Sugar Pretzel Flow -->connectWalletPolygonMessage2;
    whatIsAWalletMessage-- Genesis Pretzel Flow -->connectWalletEthereumMessage2;

    whatIsAChainMessage-- Sugar Pretzel Flow -->connectWalletPolygonMessage2;
    whatIsAChainMessage-- Sugar Pretzel Flow -->connectWalletEthereumMessage2;



    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Free Pretzel Mint Experience Nodes

    firstFreePretzelMessage-- Yes & correct chain -->freePretzelMessage2;
    firstFreePretzelMessage-- Yes & wrong chain -->connectWalletPolygonMessage;
    firstFreePretzelMessage-- No -->mainMenuMessage;

    freePretzelMessage-- Yes & correct chain -->freePretzelMessage2;
    freePretzelMessage-- Yes & wrong chain -->connectWalletPolygonMessage;
    freePretzelMessage-- No -->mainMenuMessage;

    freePretzelMessage2-- Yes --> mainMenuMessage;
    freePretzelMessage2-- No --> mainMenuMessage;

    connectWalletPolygonMessage-- Connect Metamask & No Metamask -->mainMenuMessage;
    connectWalletPolygonMessage-- Connect Metamask & Not Polygon Network -->changeChainPolygonMessage;
    connectWalletPolygonMessage-- Connect Metamask & Success & Mint Gasless -->firstFreePretzelMessage;
    connectWalletPolygonMessage-- Connect Metamask & Success & Not Mint Gasless -->freePretzelMessage;
    connectWalletPolygonMessage-- What is a Wallet? -->whatIsAWalletMessage;
    connectWalletPolygonMessage-- Got Back -->mainMenuMessage;

    connectWalletPolygonMessage2-- Connect Metamask & No Metamask -->mainMenuMessage;
    connectWalletPolygonMessage2-- Connect Metamask & Not Polygon Network -->changeChainPolygonMessage;
    connectWalletPolygonMessage2-- Connect Metamask & Success & Mint Gasless -->firstFreePretzelMessage;
    connectWalletPolygonMessage2-- Connect Metamask & Success & Not Mint Gasless -->freePretzelMessage;
    connectWalletPolygonMessage2-- Got Back -->mainMenuMessage;

    changeChainPolygonMessage-- Change to Polygon! & Not Mint Gasless -->freePretzelMessage;
    changeChainPolygonMessage-- Change to Polygon! & Mint Gasless -->firstFreePretzelMessage;
    changeChainPolygonMessage-- What is a Chain? -->whatIsAChainMessage;
    changeChainPolygonMessage-- Got Back -->mainMenuMessage;

    changeChainPolygonMessage2-- Change to Polygon! & Not Mint Gasless -->freePretzelMessage;
    changeChainPolygonMessage2-- Change to Polygon! & Mint Gasless -->firstFreePretzelMessage;
    changeChainPolygonMessage2-- Got Back -->mainMenuMessage;


    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Special Pretzel Minting Experience Nodes
    specialPretzelMessage1-- 1 --> specialPretzelMessage2;
    specialPretzelMessage1-- 2 --> specialPretzelMessage2;
    specialPretzelMessage1-- 3 --> specialPretzelMessage2;
    specialPretzelMessage1-- Go Back --> mainMenuMessage;

    specialPretzelMessage2-- Take me to Opensea --> mainMenuMessage;
    specialPretzelMessage2-- I am good --> mainMenuMessage;

    specialPretzelsSoldOutMessage-- View on Opensea -->mainMenuMessage;
    specialPretzelsSoldOutMessage-- I am good -->mainMenuMessage;

    connectWalletEthereumMessage-- Connect Metamask & No Metamask -->mainMenuMessage;
    connectWalletEthereumMessage-- Connect Metamask & Not Ethereum Network -->changeChainEthereumMessage;
    connectWalletEthereumMessage-- Connect Metamask & Success & Not sold out -->specialPretzelMessage1;
    connectWalletEthereumMessage-- Connect Metamask & Success & Not sold -->specialPretzelsSoldOutMessage;
    connectWalletEthereumMessage-- What is a Wallet? -->whatIsAWalletMessage;
    connectWalletEthereumMessage-- Got Back -->mainMenuMessage;

    connectWalletEthereumMessage2-- Connect Metamask & No Metamask -->mainMenuMessage;
    connectWalletEthereumMessage2-- Connect Metamask & Not Ethereum Network -->changeChainEthereumMessage;
    connectWalletEthereumMessage2-- Connect Metamask & Success & Not sold out -->specialPretzelMessage1;
    connectWalletEthereumMessage2-- Connect Metamask & Success & Not sold -->specialPretzelsSoldOutMessage;
    connectWalletEthereumMessage2-- Got Back -->mainMenuMessage;

    changeChainEthereumMessage-- Change to Ethereum! & Not sold out -->specialPretzelMessage1;
    changeChainEthereumMessage-- Change to Ethereum! & Sold out -->specialPretzelsSoldOutMessage;
    changeChainEthereumMessage-- What is a Chain? -->whatIsAChainMessage;
    changeChainEthereumMessage-- Got Back -->mainMenuMessage;

    changeChainEthereumMessage2-- Change to Ethereum! & Not sold out -->specialPretzelMessage1;
    changeChainEthereumMessage2-- Change to Ethereum! & Sold out -->specialPretzelsSoldOutMessage;
    changeChainEthereumMessage2-- Got Back -->mainMenuMessage;

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Failure Nodes
    somethingWentWrongWhileMintingMessage-- Try Again & Sugar Pretzels -->connectWalletPolygonMessage;
    somethingWentWrongWhileMintingMessage-- Try Again & Genesis Pretzels -->connectWalletEthereumMessage;
    somethingWentWrongWhileMintingMessage-- Never Mind -->mainMenuMessage;

:::
:::

# State Machine for Messages
The below diagram shows the flow and connection of message nodes with corresponding inputs (outputs currently not shown). To display the flow chart use a mermaid.js markdown preview extension in VS-Code. 

::: mermaid
graph TD;
    landing_page-- Enter --> introMessage;

    %%%%%%%%%%%%%%%%%%%%%%
    %% Intro Message Nodes
    introMessage-- Metamask -->introMessage2;
    introMessage-- Wallet Connect -->introMessage2;
    introMessage-- Help Me -->UNKNOWN;

    introMessage2-- Free Pretzel --> freePretzelMessage2;
    introMessage2-- Special Pretzels --> specialPretzelMessage1;
    introMessage2-- No, I'm good --> landing_page;

    introMessage3-- Free Pretzel --> freePretzelMessage2;
    introMessage3-- Special Pretzels --> specialPretzelMessage1;
    introMessage3-- No, I'm good --> landing_page;

    introAfterFreeMessage-- Another Pretzel --> freePretzelMessage5;
    introAfterFreeMessage-- Special Pretzels --> specialPretzelMessage1;
    introAfterFreeMessage-- No, I'm good --> landing_page;

    introAfterSecretMessage-- Free Pretzel --> freePretzelMessage2;
    introAfterSecretMessage-- Secret Pretzels --> specialPretzelMessage1;
    introAfterSecretMessage-- No, I'm good --> landing_page;

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Free Pretzel Mint Experience Nodes
    freePretzelMessage2-- Yes --> freePretzelMessage3;
    freePretzelMessage2-- No --> introMessage2;

    freePretzelMessage3-- Yes --> freePretzelMessage4;
    freePretzelMessage3-- No --> freePretzelMessage4;

    freePretzelMessage4-- Another Pretzel --> freePretzelMessage5;
    freePretzelMessage4-- Special Pretzels --> specialPretzelMessage1;
    freePretzelMessage4-- No --> introAfterFreeMessage;

    freePretzelMessage5-- Yes --> freePretzelMessage3;
    freePretzelMessage5-- No --> introAfterFreeMessage;

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    %% Special Pretzel Minting Experience Nodes
    specialPretzelMessage1-- Buy --> specialPretzelMessage2;
    specialPretzelMessage1-- No --> introAfterSecretMessage;

    specialPretzelMessage2-- Yes --> specialPretzelMessage3;
    specialPretzelMessage2-- No --> specialPretzelMessage3;

    specialPretzelMessage3-- Buy Pretzel --> specialPretzelMessage2;
    specialPretzelMessage3-- No --> introAfterSecretMessage;


:::

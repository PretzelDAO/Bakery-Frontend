<h1 align="center">
  <img alt="sugar pretzels" src="https://i.imgur.com/9X1UUJ6.png" width="800px"/><br/>
  Sugar Pretzels
</h1>
<p align="center">NFT experiences that interact with the real-world without the barrier of gas</p>
<div align="center">
  
[![twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/PretzelDAO) [![website](https://badgen.net/badge/icon/PretzelDAO?icon=https://svgur.com/i/h12.svg&label)](https://www.pretzeldao.com/)
 
</div>

## Related Repositories
- [Smart Contracts](https://github.com/PretzelDAO/Token-Contracts/tree/main/contracts/SugarPretzels)
- [Metadata Service](https://github.com/PretzelDAO/Bakery-Metadata)

## Why Sugar Pretzels?

NFTs have, without a doubt, taken the world by storm in 2021. Whilst the UX/UI has taken major steps to making it as easy as possible for newcomers to join the NFT-craze, the overall experience can still feel disconnected.

First, the **transaction experience (TX)** is still rough. Especially for newcomers, gas fees are difficult to comprehend and an easy barrier for onboarding. After all, in the real-world there is no such thing as a visible gas fee.

Second, we associate exciting moments with emotional memory markers - such as the weather at the time of an event, the people we are with, and on a higher level the state of the world. Right now, the NFT minting experience is disconnected from the real-world - it lacks the **emotional experience (EX)**.

At Sugar Pretzels, we are building an **NFT collection without the gas fee barrier that interacts with the real world**. A NFT collection with a seamless transaction experience. A NFT collection that is coupled with the real-world. A NFT collection that is more than just art - it's a memory.

## How are Sugar Pretzels baked?

Sugar pretzels are baked with two main ingredients.

### Emotional Experience

To connect the NFT experience with the real-world we rely on Chainlink Oracles to supply external data. We are using the AccuWeather Oracle for the weather data. Specifically, our background traits are linked, via a matrix, to the temperature and precipitation in Munich (near the Schlossgarden). We are starting with weather because, as any experienced baker will tell you, weather plays an important role in how the dough reacts during baking.

### Transaction Experience

To remove the gas barrier in our NFT experience we rely on [openGNS](https://opengsn.org/). With openGNS we allow our fellow pretzels to bake their first NFTs without needing ETH for transaction fees.

## FAQ

To learn more about us, the project, and what this all means, check out our [FAQ](https://www.notion.so/pretzeldao/The-Bakery-FAQ-9324e4ace9a948b681ec994b50d133a4). Make sure to say Hi!

_WIP: more details coming soon_

## Details on the Contracts

The repository for the Smart Contracts can be found [here](https://github.com/PretzelDAO/Token-Contracts/tree/main/contracts/SugarPretzels).

### Specification

- Pretzel should be stored in an abstract representation on-chain
- The pretzels get generated based on 4 random words received from the ChainLink VRF
- Weather data is stored in the contract via the ChainLink AccuWeather oracle
- The weather data determines the background of the pretzel
- Gasless minting via OpenGSN
- Restrict the minting via OpenGSN to one time
- The weather data shall get updated every 12h by a ChainLink keeper
- Sugar Pretzels is an open edition, free mint NFT collection

## Metadata

The metadata is generated and uploaded to IPFS via our backend service [here](https://github.com/PretzelDAO/Bakery-Metadata).

### Specification

- backend reads the abstract pretzel representation from the smart contract
- generate image and metadata based on it
- upload to IPFS
- on request redirect to IPFS

## Our Beautiful Frontend

Our bakery frontend can be found in this [repository](https://github.com/PretzelDAO/Bakery-Frontend). Below we've also listed some instructions on how to get started with that as well!

### Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Supplement

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

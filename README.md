# Contact Keeper

> Full stack MERN contact manager with React hooks, context & JWT authentication.

This is the full app. The API can be found [here](https://github.com/bradtraversy/contact_keeper_api) with documented endpoints<br>
Then I learnt Node (as my main goal was to learn React) and learnt how to build it on my own, so I did some refactors.

## Usage

Install dependencies

```bash
npm install
npm client-install
```

### Mongo connection setup

Edit your /config/default.json file to include the correct MongoDB URI and JWT_SECRET

### Run Server

```bash
npm run dev     # Express & React :3000 & :5000
npm run server  # Express API Only :5000
npm run client  # React Client Only :3000
```

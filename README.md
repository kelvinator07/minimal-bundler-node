# Minimal Bundler Node

This application is a minimal bundler node that is capable of accepting ERC-4337 UserOperations, executes them on a supported chain and return the transaction hash in response.

## Project setup

```
npm install
```

Rename `.env.sample` file to `.env` and update.

### Run

#### Start the node application

```
npm run start
```

### Usage 

Send User Operation route: http://localhost:8080/api/v1/send-user-operation

Request Format
```
    {
        "jsonrpc": "2.0",
        "method": "eth_sendUserOperation",
        "id": Date.now(),
        "params": [ userOps ]
    }
```

Response Format
```
    {
        "status": "success",
        "data": {
            "jsonrpc": "2.0",
            "id": 1713789054153,
            "result": "0xtransactionHash"
        }
    }
```

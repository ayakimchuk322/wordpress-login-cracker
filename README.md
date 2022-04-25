# WordPress Login Cracker

Multithreaded WordPress login cracker. Easily bruteforce logins for dozens of sites concurrently.

## Prerequisites

* Node.js
* MongoDB (needed for scheduling jobs)
* (preferebly) VPN

## Configuration

Application is configured via `.env` file in the root directory of project.  
At the very least you should provide path to file with target sites and corresponding users.

## Input file

The input file should have next structure:

```
[
    {
        "url": "http://site.com",
        "wp_users": "user1,user2"
    },{
        "url": "http://site2.com",
        "wp_users": "user1,user2,user3..."
    },
    ...
]
```

## Build

```
npm install
```

## Usage

```
node app.js
```

## Notes

This application does not scan target WordPress sites for existing users; yous should obtain users by other means (for example, with [CMSeeK](https://github.com/Tuhinshubhra/CMSeeK) scanner)

## TODO

* configure MongoDB connection
* persist found credentials to MongoDB collection
* configure levels (verbosity) of logs

---
description: >-
  Using a network-wide resourcepack to avoid players from redownloading a
  different one on each join
---

# Single resourcepack Bungeecord


<Warning>
## This tutorial is outdated, will require a rewrite.
</Warning>


## Network-wide resourcepack

Do you want to install ItemsAdder on multiple Spigot servers of your network?\
Do you want to avoid players from downloading the resourcepack each time they change server?\
Follow this simple tutorial.

## How to set it up

For example you can have 3 servers: `lobby`, `survival`, `creative`.\\

### Step 1

Install ItemsAdder on all these 3 servers.


<Warning>
<mark style="color:red;">**This is very important**</mark>

Make sure to **sync all** the 3 servers `plugins/ItemsAdder/` **configurations folders** each time you make a modification, they must be the same, only the `config.yml` hosting part can change.

This is very crucial for this task or everything won't work.
</Warning>


### Step 2

Decide a main server, for example `lobby`.\
Open the `config.yml` of ItemsAdder in the `lobby` server and set up the hosting.


<Card title="resourcepack-hosting" icon="text" href="/../../plugin-usage/resourcepack-hosting/">
resourcepack-hosting
</Card>



<Note>
It's advised to use `self-host`, it's the best method.
</Note>


After you finished configuring the hosting (follow the linked tutorial carefully) you have to use the `/iainfo` command and get the URL in console, copy it.

For example:

![](<../../.gitbook/assets/image (87).png>)


<Warning>
You must remove the URL part after `#`, it's not needed.\
Copy it without that part after `#`.
</Warning>


#### For example using `self-host`:

<details>

<summary>Self host example</summary>


```yaml config.yml lines icon="yaml"
resource-pack:
  hosting:
    no-host:
      enabled: false
    auto-external-host:
      enabled: false
    self-host:
      enabled: true
      server-ip: YOUR_SERVER_IP_HERE
      pack-port: 8163
    external-host:
      enabled: false
      url: ''
```


Run `/iazip` to generate the resourcepack.

</details>

### Step 3

Open the other servers (survival, creative) ItemsAdder `config.yml` file and edit the hosting part.\
Instead of `YOUR_PACK_COMPLETE_URL` you have to put the **URL** you got from the `/iainfo` command.


```yaml config.yml lines icon="yaml"
resource-pack:
  hosting:
    no-host:
      enabled: false
    auto-external-host:
      enabled: false
    self-host:
      enabled: false
      server-ip: 127.0.0.1
      pack-port: 8163
    external-host:
      enabled: true
      url: 'YOUR_PACK_COMPLETE_URL'
```


### Step 4 (Bungeecord only)

Install the Bungeecord plugin to make the loading even faster!


[View here](https://www.spigotmc.org/resources/96794)



<Warning>
<mark style="color:red;">**Do not install**</mark> <mark style="color:red;">**BungeePackFix**</mark> <mark style="color:red;">**on**</mark> <mark style="color:red;">**Spigot**</mark> <mark style="color:red;">**servers!**</mark>

This is a **Bungeecord** plugin! Install it on **Bungeecord**!
</Warning>


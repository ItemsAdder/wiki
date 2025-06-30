---
description: ""
---

# HUDs, GUIs, images and more

To see how to use HUDs and GUIs API (Font Images) you can check my examples.

## GUIs


[View here](https://github.com/LoneDev6/API-ItemsAdder-Example-GUI)


## Huds


[View here](https://github.com/LoneDev6/RPGhuds)



[View here](https://github.com/LoneDev6/API-ItemsAdder-Example-ServerMonitor)


### Access mana bar value example

```java
PlayerHudsHolderWrapper huds = new PlayerHudsHolderWrapper(player);
PlayerQuantityHudWrapper manaHud = 
                new PlayerQuantityHudWrapper(huds, "magiccraft:mana_bar");
if(manaHud.exists())
  manaHud.setFloatValue(2.0f);
else
  System.out.println("Error: mana not found, maybe it's disabled.");
```


<Warning>
### NOTE

Make sure that you don't have the permission `ia.user.hud.bypass.api.*` or `setFloatValue` the code won't do anything.&#x20;
</Warning>


## FAQ


<Card title="Broken link" icon="text" href="/broken-reference/">
Broken link
</Card>


## Get Emoji or GUI character

```java
new FontImageWrapper("twitteremojis:confirm").getString()
```
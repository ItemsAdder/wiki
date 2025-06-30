---
icon: cog
---

# Google Drive


<Warning>
This method has some problems on some PCs in Minecraft versions before 1.17 because of a Minecraft bug, read more here: [https://bugs.mojang.com/browse/MC-143768](https://bugs.mojang.com/browse/MC-143768)

This method should work fine on Minecraft 1.17.1 and most recent versions as has Mojang fixed the issue.
</Warning>


### Step 1

Right-click on your resourcepack zip file and press "Get link".

![](<../../.gitbook/assets/immagine (19).png>)

### Step 2

Important: Set the permission to "Anyone with the link".

![](<../../.gitbook/assets/immagine (7).png>)

Press "Copy link".

![](<../../.gitbook/assets/immagine (5).png>)

### Step 3

Visit this website: [http://a.devs.beer/gdrive-direct](http://a.devs.beer/gdrive-direct)

Paste the link and click "Get direct link".

<img src="../../.gitbook/assets/immagine (20).png" alt="" data-size="original" />

### Step 4

The website automatically adds the generated link in your clipboard.

![](<../../.gitbook/assets/immagine (72).png>)

You can now paste the link inside **ItemsAdder** configuration file `config.yml`, then use `/iareload` command.


```yaml config.yml lines icon="yaml"
external-host:
  enabled: true
  url: 'http://drive.google.com/uc?export=view&id=10g3whim95Hab40KZNjUkwY9FUuqKMGh5'
```


### Done!

You can now see that the pack is correctly loaded by the game.

## Common issues

### Long time on "Making Request... 100%"

### ![](<../../.gitbook/assets/immagine (3).png>)

This is normal. This happens because Google Drive is doing some stuff before authorizing the download of the resourcepack.

This happens only when the player downloads the resourcepack for the first time and it will take from 5 to 10 seconds.

### Resourcepack not loading at all

This method has some problems on some PCs in Minecraft versions before 1.17 because of a Minecraft bug, read more here: [https://bugs.mojang.com/browse/MC-143768](https://bugs.mojang.com/browse/MC-143768)

This method works 100% of the time on Minecraft 1.17.1+.

## Continue installation if you need


<Card title="first-install.md" icon="text" href="/../first-install.md/">
first-install.md
</Card>
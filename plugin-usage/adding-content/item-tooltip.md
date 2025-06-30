---
icon: list-dropdown
---

# Item Tooltip


<Warning>
#### Requires **ItemsAdder 4.0.9** or greater.
</Warning>


## Configuration


```yaml contents/test_tooltip/test_tooltip_item.yml lines icon="yaml"
info:
  namespace: test_tooltip
items:
  tooltip_rainbow_item:
    display_name: tooltip_rainbow_item
    resource:
      generate: false
      model_path: minecraft:item/emerald
      material: PAPER
    tooltip_style: test_tooltip:tooltip/rainbow
```


## Image files

Create the required files into `contents/test_tooltip/textures/tooltip/`.

<img src="../../.gitbook/assets/image (9).png" alt="" />


<Note>
Tooltip support animated textures (`.png.mcmeta` files).
</Note>


Run `/iazip` and then get the item ingame.

<img src="../../.gitbook/assets/image (8).png" alt="" />

## Old method

You can add custom textured tooltips for your items, please refer to this example addon:\
[https://www.spigotmc.org/resources/items-custom-tooltip-texture-example-itemsadder-addon.87883/](https://www.spigotmc.org/resources/items-custom-tooltip-texture-example-itemsadder-addon.87883/).

![https://i.imgur.com/eA7iz50.gif](https://i.imgur.com/eA7iz50.gif)

## Limitations


<Warning>
* You cannot show custom enchants as they will go out of the window if the image is too small.
* You have to write everything in the tooltip image, text would go out of the window if the image is too small.
</Warning>


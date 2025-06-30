---
description: Collection of basic item properties
icon: sliders-simple
---

# Basic

## `enabled`

```yaml
enabled: true
```

With this setting you can disable an item completely.


<Warning>
Items won't be deleted from the world or inventories if you disable them.
</Warning>


## `name`

```yaml
name: "Test"
```

Item name shown in the tooltip.


<Warning>
ItemsAdder 4.0.8 and lower use the `display_name` property instead.
</Warning>


## `permission_suffix`

```yaml
permission_suffix: myitem
```

This property is used to identify if a user has permission to see an item in the `/ia` GUI.\
For example the full permission will be `ia.user.ia.seeitem.myitem`.

For now this is the only use of this permission.


<Card title="permission.md" icon="text" href="/permission.md/">
permission.md
</Card>


## `lore`

```yaml
lore:
- '&7When you mine a block'
- '&7it drops exp orbs'
- '&750% of times.'
```

Lore lines of the item.

## `enchants`

```yaml
enchants:
  - ARROW_FIRE:1
  - anger_artifact:1
  - my_custom_plugin:custom_enchant:6
```

Enchants of the item.\
You can set [vanilla enchants](https://hub.spigotmc.org/javadocs/bukkit/org/bukkit/enchantments/Enchantment.html) and custom enchants of other plugins (for example [EcoEnchants](../../../compatibility-with-other-plugins/compatible/ecoenchants.md), [ExcellentEnchants](https://www.spigotmc.org/resources/goldenenchants-%E2%80%A2-more-vanilla-like-enchantments-1-14-1-16.61693/)...).\
Supports also **namespaces** (if you are creating custom enchants using Namespaced keys).

## `attribute_modifiers`

```yaml
attribute_modifiers:
  mainhand:
    attackDamage: 19
    attackSpeed: 1.1
    maxHealth: 1.1
    movementSpeed: -1
    armor: 1.1
    armorToughness: 1.1
    attackKnockback: 1.1
    luck: 1.1
  offhand:
    attackDamage: 19
    attackSpeed: 1.1
    maxHealth: 1.1
    movementSpeed: 1.1
    armor: 1.1
    armorToughness: 1.1
    attackKnockback: 1.1
    luck: 1.1
```

These are the vanilla attribute modifiers, you can get more info here: [https://minecraft.wiki/w/Attribute](https://minecraft.wiki/w/Attribute)

## `durability`

```yaml
durability:
  max_custom_durability: 200
  custom_durability: 32
  disappear_when_broken: false
  unbreakable: false
  usages: 5
```

`usages` : Number of usages for the current item. Remember to decrement it using [events](events/).

`custom_durability` : Initial durability which the item has (if not specified is the same as `max_custom_durability`).

`max_custom_durability` : Max durability of the item.

## `item_flags`

```yaml
item_flags:
  - HIDE_ATTRIBUTES
  - HIDE_DESTROYS
  - HIDE_ENCHANTS
  - HIDE_PLACED_ON
  - HIDE_POTION_EFFECTS
  - HIDE_UNBREAKABLE
```

Special item flags that can hide some vanilla info of the item.\
You can find a detailed info list here: [https://hub.spigotmc.org/javadocs/spigot/org/bukkit/inventory/ItemFlag.html](https://hub.spigotmc.org/javadocs/spigot/org/bukkit/inventory/ItemFlag.html)


<Note>
This option is old and might not working as it did on previous game versions due to changes in Minecraft 1.20.4.
</Note>


## `blocked_enchants`

Disables enchants for this item.

<Tabs>
  <Tab title="Disable some enchants">

```yaml
blocked_enchants:
- DAMAGE_UNDEAD
- DAMAGE_ALL
- DAMAGE_ARTHROPODS
- KNOCKBACK
- DURABILITY
- SWEEPING_EDGE
```

  </Tab>
  <Tab title="Disable all enchants">

```yaml
blocked_enchants:
- ALL
```

  </Tab>
</Tabs>


## `events_needed_player_stats`

Special attribute to make events work only if the player stat (ItemsAdder player stat, which are usually shown in HUDs) satisfies the set rule. You can set it to `>`, `<` ad `=`.

Example: [magic wand example item](../other-items-examples/magic-wand.md).

## `glow`

You can make an item glowing when dropped on the ground.\
Very useful for **rare items**.


<Warning>
Available on ItemsAdder 4.0.9 or greater.
</Warning>


![](<../../../.gitbook/assets/immagine (16).png>)

```yaml
items:
  glowing_item:
    display_name: Glowing Item
    resource:
      material: DIAMOND
      generate: true
      textures:
      - item/glowing_item.png
    drop:
      glow:
        enabled: true
        color: DARK_RED
```

## `show_name`

You can make a drop show its name.\
Very useful for **rare items**.

![](<../../../.gitbook/assets/immagine (118) (2) (3).png>)

```yaml
  glowing_item:
    display_name: Glowing Item
    resource:
      material: DIAMOND
      generate: true
      textures:
      - item/glowing_item.png
    drop:
      show_name: true
```

## `template` and `variant_of`


<Card title="templates-and-variants.md" icon="text" href="/templates-and-variants.md/">
templates-and-variants.md
</Card>


## Use the official files editor to read all the properties


<Card title="files-editor.md" icon="text" href="/../../beginners/files-editor.md/">
files-editor.md
</Card>


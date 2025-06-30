---
icon: cog
---

# RPGBank

## [Download here](https://www.spigotmc.org/resources/%E2%9C%85must-have%E2%9C%85-rpgbank-store-your-items-exp-and-money-using-villagers-npcs-and-custom-gui.29139/)


<Warning>
You must have the [DefaultPack](../../plugin-usage/first-install.md#default-pack-optional) installed!
</Warning>


You can change GUI icons and use ItemsAdder icons to achieve this:

![](<../../.gitbook/assets/image (110).png>)

<Tabs>
  <Tab title="config.yml">

```yaml
  icons:
    money-indicator: coin
    next-page: icon_right_blue
    previous-page: icon_left_blue
    page-indicator: BLACK_STAINED_GLASS_PANE
    deposit-exp: icon_ender_chest
    locked: icon_lock
    deposit-money: icon_arrow_chest
```

  </Tab>
  <Tab title="language file">

```yaml
account-title: :offset_-16::blank_menu::offset_-176:&0{player}
```

  </Tab>
</Tabs>
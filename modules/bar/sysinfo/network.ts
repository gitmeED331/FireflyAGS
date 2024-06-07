import { Network, Widget, Audio, Utils, PopupWindow, Gtk } from "../../../imports";
import icons from "../icons/index.js";

const { Box, Button, Label, Icon } = Widget;
const { execAsync } = Utils;
const network = await Service.import('network')

const WifiIndicator = () => Box({
    children: [
        Icon({
            icon: network.wifi.bind('icon_name'),
        }),
        Label({
            label: network.wifi.bind('ssid')
                .as(ssid => ssid || 'Unknown'),
        }),
    ],
})

const WiredIndicator = () => Icon({
    icon: network.wired.bind('icon_name'),
})

export const NetworkIndicator = () => Widget.Stack({
	className: "networkindicator",
    children: {
        wifi: WifiIndicator(),
        wired: WiredIndicator(),
    },
    shown: network.bind('primary').as(p => p || 'wifi'),
})

/*
const { bar, datewin } = options;
const pos = datewin.position.bind();
const layout = Utils.derive([bar.position, datewin.position], (bar, qs) => 
		`${bar}-${qs}` as const,
	);
	
const NetWidgetWin = () => PopupWindow({
    name: "netwidget",
    className: "netwidget",
    anchor: ["top", "right"],
    margins: [12, 12, 15],
    transition: "slide_down",
    child: 
        Box({
            vertical:true,
            children: [
                WifiList(),
            ]
        })
});

export function NetWidget() {
    App.addWindow(NetWidgetWin())
    layout.connect("changed", () => {
        App.removeWindow("netwidget")
        App.addWindow(NetWidgetWin())
    })
}


const ap = Network;
const Expander = Widget.subclass(Gtk.Expander);

export const WifiBTN = () => Button({
		class_name: "wifibtn",
		on_primary_click: () => { App.toggleWindow("netwidget") },
		tooltip_text: JSON.stringify(ap, null, 2),
		child:  Widget.Icon({
				icon: Network.wifi.bind('icon_name'),
				}),
  });
  
const WifiGroup = (expander, aps) => {
const strongest = aps.sort((a, b) => b.strength - a.strength);

  if(!expander) {
    expander = Expander({
      class_name: "wifi-group",
      label_widget: Widget.Box({
        spacing: 8,
        children: [
          Widget.Icon({icon: strongest[0].iconName}),
          Widget.Label({label: strongest[0].ssid}),
        ]
      })
    })
      .hook(Network, self => {
        self.toggleClassName("connected", Network.wifi.ssid === aps[0].ssid);
      });
  }

  const group = Widget.Box({
    class_name: "wifi-group-list",
    vertical: true,
    children: strongest.map(WifiBTN)
  });
  expander.child = group;

  return expander;
};

export const WifiList = () => Widget.Box({
	className: 'wifilist',
  vertical: true,
  spacing: 5,
  attribute: {
    networks: new Map()
  }
}).hook(Network, box => {
  const aps = Network.wifi.access_points.sort((a, b) => b.strength - a.strength);
  const apGroups = Object.values(aps.reduce((acc, ap) => {
    if(!acc[ap.ssid]) acc[ap.ssid] = [];
    acc[ap.ssid].push(ap);
    return acc;
  }, {}));
  const networkMap = new Map();
  apGroups.forEach(group => {
    networkMap.set(group[0].ssid,
      WifiGroup(box.attribute.networks.get(group[0].ssid), group));
  });
  box.attribute.networks = networkMap;
  box.children = Array.from(networkMap.values());
});

export default WifiList;
*/

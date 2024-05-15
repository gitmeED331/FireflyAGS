import { Widget, Notifications, Utils, Gio, Gtk } from "../../imports";

const { Box } = Widget;

const Notifs = Box({
    class_name: "panel-notifs",
    spacing: 20,
    vertical: true,
    vexpand: true,
    setup: (self) => {
        self.hook(Notifications, (self) => {
            self.children = Notifications.notifications.map(n => Widget.Box({
                class_name: "notificationListItem",
                vertical: true,
                children: [
                    Widget.Button({
                        on_clicked: () => {
                            n.close()
                        },
                        child: Box({
                            class_name: "notificationBody",
                            spacing: 20,
                            children: [
                                Widget.Label({
                                    label: "󰍡",
                                    class_name: "notificationImage"
                                }),
                                Box({
                                    vertical: true,
                                    children: [
                                        Widget.Label({
                                            label: `${n.summary}`,
                                            class_name: "notificationTitle",
                                            xalign: 0,
                                            wrap: true
                                        }),
                                        Widget.Label({
                                            vpack: "start",
                                            hpack: "start",
                                            class_name: "notificationDescription",
                                            xalign: 0,
                                            wrap: true,
                                            label: n.body
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ],
            })
            )
        })
    }
})
const NotifBox = Widget.Scrollable({
    vscroll: 'always',
    hscroll: 'never',
    vexpand: true,
    className: 'notificationBox',
    child: Notifs,
})

const Empty = Widget.Box({
  class_name: "notificationEmpty",
  spacing: 20,
  hpack: "center",
  vpack: "center",
  vertical: true,
  children: [
    Widget.Label({
      label: `󱙎 `,
      vpack: "center",
      vexpand: true,
    })
  ]
})

export const NotificationList = () => Widget.Box({
    class_name: "notificationList",
    //spacing: 20,
    vertical: true,
    vexpand: true,
    children: [
        Widget.CenterBox({
			className: 'notifTitleBox',
            start_widget: Widget.Label({
				className: "notifTitle",
                label: "Notifications",
                vpack: 'end',
                hpack: 'end',
            }),
            end_widget: Widget.Button({
                label: "  ",
                hpack: 'center',
                vpack: 'end',
                className: "trashicon",
                on_clicked: () => {
                    const list = Array.from(Notifications.notifications);
                    for (let i = 0; i < list.length; i++) {
                        Utils.timeout(50 * i, () => list[i]?.close());
                    }
                }
            })
        }),
        Widget.Stack({
            transition: 'crossfade',
            transitionDuration: 150,
            children: {
                'empty': Empty,
                'list': NotifBox
            },
            setup: (self) => {
                self.hook(Notifications, (self) => {
                    self.shown = (Notifications.notifications.length == 0 ? 'empty' : 'list')
                })
            }
        }),
    ],
})

import { Widget, Gtk, PopupWindow, Utils } from "../../imports";
import options from "options"

const { Box } = Widget;
const { execAsync } = Utils;
const Calendar = Widget.subclass(Gtk.Calendar)
const { bar, datewin } = options;
const pos = datewin.position.bind();
const layout = Utils.derive([bar.position, datewin.position], (bar, qs) => 
		`${bar}-${qs}` as const,
	);

const DateWin = () =>  PopupWindow({
    name: "calendar",
    className: "calpopwin",
    anchor: pos,
    transition: pos.as(pos => pos === "top" ? "slide_down" : "slide_up"),
    layer: "top",
     exclusivity: 'normal',
    keymode: 'on-demand',
    margins: [0,550],
    child: Box({
		className: "calendar",
		child: Calendar({
			className: "calwid",
			hexpand: false,
			vexpand: true,
			hpack: "center",
			vpack: "center",
		})
	})
});

export function CalendarWin() {
    App.addWindow(DateWin())
    layout.connect("changed", () => {
        App.removeWindow("calendar")
        App.addWindow(DateWin())
    })
}

/*
import { Widget, Gtk, PopupWindow, Utils } from "../../imports";
import options from "options"

const { Box } = Widget;
const { execAsync } = Utils;
const Calendar = Widget.subclass(Gtk.Calendar)
const { bar, datewin } = options;
const pos = datewin.position.bind();
const layout = Utils.derive([bar.position, datewin.position], (bar, qs) => 
		`${bar}-${qs}` as const,
	);

const DateWin = () =>  PopupWindow({
    name: "calendar",
    className: "calpopwin",
    anchor: pos,
    transition: pos.as(pos => pos === "top" ? "slide_down" : "slide_up"),
    layer: "top",
    hexpand: true,
    vexpand: false,
    child: Box({
		className: "calendar",
		child: Calendar({
			className: "calwid",
			hexpand: false,
			vexpand: true,
			hpack: "center",
			vpack: "center",
		})
	})
});

export function CalendarWin() {
    App.addWindow(DateWin())
    layout.connect("changed", () => {
        App.removeWindow("calendar")
        App.addWindow(DateWin())
    })
}
*/

import { Widget, Utils, Mpris, Hyprland, Audio, Roundedges } from "../../imports";
import options from "../../options";

const { RoundedAngleEnd } = Roundedges;
const { Window, Box, CenterBox, Button, Icon, Label, Slider } = Widget;
const mpris = await Service.import("mpris");

// Widgets
import { Workspaces } from "./workspaces";
import { Title } from "./title";
import { MediaBTN } from "./media";
import { SysInfo } from	"./sysinfo/sysinfo";
import {TrayReveal, Expandbtn} from "./tray";
import { Clock } from "./clock";

const pos = options.bar.position.bind();

const Spacer = () => Box({
	className: "spacer",
	hexpand: true,
});
const Dashbtn = ( ) => Button({
	class_name: 'dashbtn',
	onClicked: ( ) => App.toggleWindow("dashboard"),
	child: Icon({ icon: 'alienarena'}),
});

const Left = ()	=> Box({
	className: "barleft",
	hpack:	"start",
	children: [ 
		Workspaces(),
		RoundedAngleEnd("topright", {className: "angleRight"}),
		Spacer(),
		RoundedAngleEnd("topleft", {className: "angleLeft"}),
		Title(),
		RoundedAngleEnd("topright", {className: "angleRight"}),
		Spacer(),
	],
});
const Right	= () =>	Box({
	className: "barright",
	hpack:	"end",
	hexpand: true,
	children: [
		RoundedAngleEnd("topleft", {className: "angleLeft"}),
		MediaBTN(),
		RoundedAngleEnd("topright", {className: "angleRight"}),
		Spacer(),
		RoundedAngleEnd("topleft", {className: "angleLeft"}),
		Dashbtn(),
	],
});
const Center = () => Box({
	className: "barcenter",
	hpack:	"center",
	hexpand: true,
	children: [
		Spacer(),
		RoundedAngleEnd("topleft", {className: "angleLeft"}),
		Clock(),
		RoundedAngleEnd("topright", {className: "angleRight"}),
		Spacer(),
		RoundedAngleEnd("topleft", {className: "angleLeft"}),
		Expandbtn(),
		TrayReveal(),
		RoundedAngleEnd("topright", {className: "angleRight"}),
		Spacer(),
		SysInfo(),
	],
});

export const Bar = () => Window({
	name: "bar",
	layer:	'overlay',
	anchor: pos.as(pos => [pos, "right", "left"]),
	exclusivity: "exclusive",
	child: CenterBox({
		className: "bar",
		hexpand: true,
		start_widget: Left(),
		center_widget: Center(),
		end_widget: Right(),
	}),
});

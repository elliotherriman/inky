let menuModifiers = [];

function modify(modifier)
{
	menuModifiers.push(modifier);
}

function build(template, callbacks, context)
{
	if (!menuModifiers.length) return;

	let index = template.map((i) => { return i.role; })
						.indexOf('window');

	let extensionsMenu = {
		label: 'Extensions',
		submenu: []
	}

	for (var inject of menuModifiers)
	{
		inject(template, extensionsMenu.submenu, callbacks, context);
		extensionsMenu.submenu.push({
			type: 'separator'
		});
	}

	template.splice(index, 0, extensionsMenu);
}

exports.menu = {build: build, modify: modify};

exports.main = "../../main-process/";
exports.renderer = "../../renderer/";
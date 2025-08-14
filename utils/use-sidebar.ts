import { DefaultTheme } from 'vitepress';
import { Struct } from './use-struct';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { getTextByCode } from './use-md';

export function genSidebarItems (structs: Struct[]): DefaultTheme.SidebarItem[] {
    const sidebarItems: DefaultTheme.SidebarItem[] = [];
    for (let i = 0; i < structs.length; i++) {
        const struct = structs[i];
        if (struct.items) {
            continue;
        }
        const file = struct.link.slice(1);
        const link = struct.link.slice(0, -3);
        const code = readFileSync(resolve(__dirname, '..', file)).toString();
        const text = getTextByCode(code);
        sidebarItems.push({
            link,
            text
        });
    }
    doHandleSidebarItems(sidebarItems);
    return sidebarItems;
}

function doHandleSidebarItems (sidebarItems: DefaultTheme.SidebarItem[]) {
    for (let i = 0; i < sidebarItems.length; i++) {
        const sidebarItem = sidebarItems[i];
        const { link } = sidebarItem;
        if (link) {
            const [root] = link.split('-');
            if (root === link) {
                continue;
            }
            const parent = sidebarItems.find(it => it.link === root);
            if (parent) {
                if (parent.items) {
                    parent.items.push(sidebarItem);
                    sidebarItems.splice(i, 1);
                    i--;
                } else {
                    parent.items = [
                        sidebarItem
                    ];
                    sidebarItems.splice(i, 1);
                    i--;
                }
            }
        }
    }
}

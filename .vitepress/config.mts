import { defineConfig } from 'vitepress'
import { genNav, genStructs, genSidebarItems } from '../utils'
import { resolve } from 'path';

const dir = resolve(__dirname, '..');
const structs = genStructs(dir);
const nav = genNav(structs);
const sidebar = genSidebarItems(structs);
export default defineConfig({
    title: 'BenBat',
    locales: {
        root: { label: '简体中文' },
        en: { label: 'English' }
    },
    themeConfig: {
        nav,
        sidebar
    }
})

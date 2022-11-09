import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    locale: 'en',
    messages: {
        ja: { 
            'hello': 'こんにちは！',
            'Search User': 'ユーザー検索',
            'Post': '投稿',
            'Navbar/Home page': 'ホームページ',
            'Navbar/My page': 'マイページ',
            'Navbar/Edit user': '設定',
            'Navbar/Log out': 'ログアウト',
            'Userpage/posts': '投稿',
            'UserPage/followes': 'フォロワ―',
            'UserPage/following': 'フォロー中'
        },
        en: { 
            'hello': 'hello',
            'Search User': 'Search User',
            'Post': 'Post',
            'Navbar/Home page': 'Home page',
            'Navbar/My page': 'My Page',
            'Navbar/Edit user': 'Edit User',
            'Navbar/Log out': 'Log out',
            'Userpage/posts': 'posts',
            'UserPage/followes': 'followes',
            'UserPage/following': 'following'
        }
    }
})
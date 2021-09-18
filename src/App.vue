<!-- <div>
		<h1>
			{{ title }}
		</h1>
		<p>{{ count }}</p>
		<button @click="count++">추가</button>
		<v-app>
			<v-content>
				<User />
			</v-content>
		</v-app>
	</div> -->

<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" fixed app>
			<v-list dense>
				<v-list-tile>
					<v-list-tile-action>
						<i class="fas fa-home"></i>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>Home</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile>
					<v-list-tile-action>
						<i class="fas fa-user"></i>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>About</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>
		<v-toolbar color="indigo" dark fixed app>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>Application</v-toolbar-title>
		</v-toolbar>
		<v-content> <router-view></router-view></v-content>
		<v-footer color="indigo" app>
			<span class="white--text">&copy; 2017</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	props: {
		source: String,
	},

	data: () => ({
		title: '안녕하세요.',
		count: 0,
		drawer: null,
	}),
	methods: {},
	computed: {},
};
</script>

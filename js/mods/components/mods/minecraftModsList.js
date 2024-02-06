/* global Vue */
/* eslint no-multi-str: 0 */

Vue.component('minecraft-mod-list', {
  template: `
    <ul class="mod-ul">
      <minecraft-mod v-for="(mod, index) in mods" :key="index" :mod="mod"></minecraft-mod>
    </ul>
  `,
  props: {
    mods: Object
  },
  data() {
    return {
      thumbnailCache: []
    }
  },
  methods: {
    searchCache(modName) {
      return this.thumbnailCache.filter(mod => modName === mod.modName)[0]
    },
    modToRepoName(mod) {
      return mod.resource_pack.git_repository ? mod.resource_pack.git_repository.split('/').pop() : null
    }
  },
})

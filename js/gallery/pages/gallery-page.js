const VERSION_JAVA = '1.17'
const BRANCH_JAVA = 'Jappa-1.17'
const VERSION_BEDROCK = '1.16.100'
const BRANCH_BEDROCK = 'Jappa-1.16.200'
window.ERROR_IMG = 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Compliance-Java-32x/Jappa-1.17/assets/minecraft/textures/item/barrier.png'

const TYPE_JAVA = 'java'
const TYPE_BEDROCK = 'bedrock'
const TYPE_DUNGEONS = 'dungeons'
const TYPE_EDUACTION = 'education'

window.capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default {
  name: 'gallery-page',
  props: {
    version: String
  },
  data() {
    return {
      imageArray: [
        { title: 'Dummy', path: 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Resource-Pack-32x/' + BRANCH_JAVA + '/assets/minecraft/textures/block/barrel_top.png' }
      ],
      versions: [
        { title: 'java-32x' },
        { title: 'java-64x' },
        { title: 'bedrock-32x' },
        { title: 'bedrock-64x' },
        { title: 'dungeons' },
        { title: 'education' }
      ],
      javaSections: ['block', 'colormap', 'effect', 'entity', 'environment', 'font', 'gui', 'item', 'map', 'misc', 'mob_effect', 'models', 'painting', 'particle'],
      bedrockSections: ['blocks', 'colormap', 'effect', 'entity', 'environment', 'gui', 'items', 'map', 'misc', 'models', 'painting', 'particle', 'ui'],
      dungeonsSections: ['blocks', 'components', 'decor', 'effects', 'entity', 'equipment', 'items', 'materials', 'others', 'ui'],
      educationSections: ['null'],

      currentType: '',
      currentSections: [],
      currentRepository: '',
      currentBranch: ''
    }
  },
  watch:{
    $route() {
      this.update()
    }
  },
  template:
  `<div>
    <div class="mb-4">
      <router-link v-for="item in versions" :key="item.title" class="btn btn-dark mr-1 mb-2" :to="'/' + item.title + '/' + $route.params.section">{{ window.capitalize(item.title) }}</router-link>
    </div>
    <div class="mb-4">
      <router-link v-for="item in currentSections" :key="item" class="btn btn-dark mr-1 mb-2" :to="'/' + $route.params.version + '/' + item">{{ window.capitalize(item) }}</router-link>
    </div>
    <div class="res-grid-6">
      <div v-for="item in imageArray" :key="item.title" class="gallery-item">
        <img :src="item.path" loading="lazy" :alt="item.title" onerror="this.src = window.ERROR_IMG">
        <a :href="item.path" download class="fas fa-download"></a>
        <i class="fas fa-expand" v-on:click="fullscreen()"></i>
        <div class="info">
          <p>{{ item.title }}</p>
          <p>More soon</p>
        </div>
      </div>
    </div>
  </div>`,
  methods: {
    loadType() {
      let tempVersion = this.$route.params.version.toLowerCase()
      if (tempVersion.includes(TYPE_JAVA)) {
        this.currentType = TYPE_JAVA
        this.currentSections = this.javaSections
        if (tempVersion.includes('64')) this.currentRepository = 'Resource-Pack-64x'
        else this.currentRepository = 'Resource-Pack-32x'
        this.currentBranch = BRANCH_JAVA
      } else if (tempVersion.includes(TYPE_BEDROCK)) {
        this.currentType = TYPE_BEDROCK
        this.currentSections = this.bedrockSections
        if (tempVersion.includes('64')) this.currentRepository = 'Compliance-Bedrock-64x'
        else this.currentRepository = 'Compliance-Bedrock-32x'
        this.currentBranch = BRANCH_BEDROCK
      } else if (tempVersion.includes(TYPE_DUNGEONS)) {
        alert('not yet implemented')
        this.currentType = TYPE_DUNGEONS
        this.currentSections = this.dungeonsSections
        this.currentRepository = null
        this.currentBranch = null
      } else if (tempVersion.includes(TYPE_EDUACTION)) {
        alert('not yet implemented')
        this.currentType = TYPE_EDUACTION
        this.currentSections = this.educationSections
        this.currentRepository = 'Education-Edition'
        this.currentBranch = null
      }
    },
    async update() {
      this.loadType()
      let contributors = await fetch('https://raw.githubusercontent.com/Compliance-Resource-Pack/JSON/main/contributors/' + this.currentType + '.json')
                          .then(response => response.json())
      let tempArray = []
      let currentItem = null
      contributors.forEach((item, i) => {
        if (this.currentType == TYPE_JAVA) currentItem = '/assets/' + item.version[VERSION_JAVA]
        else if (this.currentType == TYPE_BEDROCK) currentItem = '/' + item.path
        if (currentItem.includes(this.$route.params.section + '/')) {
          let builtUrl = 'https://raw.githubusercontent.com/Compliance-Resource-Pack/' + this.currentRepository + '/' + this.currentBranch + currentItem
          tempArray.push({
            title: currentItem.substring(currentItem.lastIndexOf('/') + 1, currentItem.lastIndexOf('.')),
            path: builtUrl
          })
        }
      })
      this.imageArray = tempArray
    },
    fullscreen() {
      alert('not yet implemented')
    }
  },
  mounted() {
    this.update()
  }
}

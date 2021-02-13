// Used in download.html
const DEFAULT_ORG = 'Compliance-Resource-Pack'
const DUNGEONS_ORG = 'Compliance-Dungeons'

let cache = {}

async function getJson(url) {
	if (cache.hasOwnProperty(url)) {
	  console.log('cached: ' + url)
	  return cache[url]
	} else {
	  console.log('new: ' + url)
	  let data = await fetch(url).then(response => response.json())
	  cache[url] = data
	  return data
	}
}

async function getDownloads(id, release, org, repo, assetIndex = 0) {
	let	url = `https://api.github.com/repos/${org}/${repo}/releases`
	let data = await getJson(url)
	document.getElementById(id).innerHTML = data[release - 1]['assets'][assetIndex]['download_count'] + '<i style="margin-left: 10px" class="fas fa-download"></i>'
}

async function run() {
	await getDownloads('c32-j-beta-1', 1, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-7', 2, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-6', 3, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-5', 4, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-4', 5, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-3', 6, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-2', 7, DEFAULT_ORG, 'Compliance-Java-32x')
	await getDownloads('c32-j-alpha-1', 8, DEFAULT_ORG, 'Compliance-Java-32x')

	await getDownloads('c32-b-beta-1', 1, DEFAULT_ORG, 'Compliance-Java-32x', 1)

	await getDownloads('c32-d-beta-1', 1, DUNGEONS_ORG, 'Resource-Pack')
}

run()

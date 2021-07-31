import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

const options = {
  placeholderSearch: false
}

const url = 'https://meilisearch-cartera.herokuapp.com/'
const key = '9625a71bb5d6a90cee15060ed621a91f2f7fcb9e68c12a3e55918bd3c6029b24'

export default instantMeiliSearch(url, key, options)

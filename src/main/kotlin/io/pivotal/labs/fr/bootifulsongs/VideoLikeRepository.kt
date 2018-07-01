package io.pivotal.labs.fr.bootifulsongs

import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "likes", path = "likes")
interface VideoLikeRepository: CrudRepository<VideoLike, Int> {

    fun countByVideoId(videoId: Int): Int
}

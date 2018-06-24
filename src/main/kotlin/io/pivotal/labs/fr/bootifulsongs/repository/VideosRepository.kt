package io.pivotal.labs.fr.bootifulsongs.repository

import io.pivotal.labs.fr.bootifulsongs.domain.Video
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import java.util.Optional

@RepositoryRestResource(collectionResourceRel = "videos", path = "videos")
interface VideosRepository : CrudRepository<Video, Int> {

    @Query(value = "SELECT * FROM video ORDER BY RAND() LIMIT 1", nativeQuery = true)
    fun findOneAtRandom(): Optional<Video>
}
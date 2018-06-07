package io.pivotal.labs.fr.bootifulsongs.repository

import io.pivotal.labs.fr.bootifulsongs.domain.Video
import org.springframework.data.repository.CrudRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "videos", path = "videos")
interface VideosRepository : CrudRepository<Video, Int>
package io.pivotal.labs.fr.bootifulsongs

import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.hateoas.Resource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.ResponseBody

@RepositoryRestController
class VideoController(val repository: VideosRepository) {

    @PostMapping("/videos/random")
    @ResponseBody
    fun findRandom(): ResponseEntity<Resource<Video>> {
        val randomVideo = repository.findOneAtRandom()
        return randomVideo
                .map { ResponseEntity.ok(Resource(it)) }
                .orElse(ResponseEntity.noContent().build())
    }
}

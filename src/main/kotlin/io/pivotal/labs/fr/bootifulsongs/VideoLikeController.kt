package io.pivotal.labs.fr.bootifulsongs

import org.springframework.data.rest.webmvc.RepositoryRestController
import org.springframework.hateoas.Resource
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.ResponseBody

@RepositoryRestController
class VideoLikeController(private val likes: VideoLikeRepository,
                          private val videos: VideoRepository) {

    @PutMapping("/likes/{providerId}")
    @ResponseBody
    fun likeVideo(@PathVariable providerId: String): ResponseEntity<Resource<Video>> {
        val video = videos.findOneByUrlEndsWith(providerId).get()
        val like = VideoLike(video = video)
        likes.save(like)

        return ResponseEntity.ok().build()
    }

    @GetMapping("/likes/{providerId}")
    @ResponseBody
    fun getVideoLikes(@PathVariable providerId: String): ResponseEntity<Resource<Count>> {
        val count = videos.findOneByUrlEndsWith(providerId).map { likes.countByVideoId(it.id) }.orElse(0)
        val result = Resource(Count(count))
        return ResponseEntity.ok().body(result)
    }
}

data class Count(val count: Int)

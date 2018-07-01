package io.pivotal.labs.fr.bootifulsongs

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "video_like")
data class VideoLike(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int = -1,
        @ManyToOne
        val video: Video
)

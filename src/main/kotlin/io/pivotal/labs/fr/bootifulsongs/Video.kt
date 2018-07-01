package io.pivotal.labs.fr.bootifulsongs

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class Video(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int,
        val url: String
)

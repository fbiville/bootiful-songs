package io.pivotal.labs.fr.bootifulsongs

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BootifulSongsApplication

fun main(args: Array<String>) {
    runApplication<BootifulSongsApplication>(*args)
}

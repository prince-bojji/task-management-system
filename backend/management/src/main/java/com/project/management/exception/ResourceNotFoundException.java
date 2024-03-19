package com.project.management.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
    
    /**
     * Exception to be thrown when a requested resource is not found.
     *
     * @param message The detail message.
     */
    public ResourceNotFoundException(String message){
        super(message);
    }
}
package com.bootcoding.email_writer_sb.app;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EmailRequest {
    private String emailContent;
    private String tone;
}
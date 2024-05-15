package com.api.nextschema.NextSchema.enums;

public enum Role {
    ROLE_ADMIN("admin"),
    ROLE_LZ("lz"),
    ROLE_BRONZE("bronze"),
    ROLE_SILVER("silver");

    private String role;
    Role(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
}

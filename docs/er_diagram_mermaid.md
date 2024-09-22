# ER Diagram

````mermaid

erDiagram
    
    USER_HASHTAG_USE {
        int id
        int project_id FK
        int ig_user_id FK
        int hashtag_id FK
        int image_id FK
    }
    
    IMAGE {
        int id
        string file
        boolean is_data_gathered 
        int project_id FK
        int average_hash
        int is_similar_to_id FK
    }
    
    IMAGE_DATA {
        string field_name
        string value
        int image_id FK
    }
    
    IMAGE_CROP {
        string field_name
        float top_percent
        float left_percent
        float height_percent
        float width_percent
        string recognized_text
        int image_id FK
    }
    

````




````mermaid

erDiagram
    PROJECT {
        int id
        string name
    }
    
    PROJECT_DEFAULT_CROP {
        int project_id FK
        float top_percent
        float left_percent
        float height_percent
        float width_percent
        string field_name
    }
    
    HASHTAG {
        int id
        int project_id FK
        string content
        int created_from_image_id FK
    }

    IG_USER {
        int id
        int project_id FK
        string name
        int created_from_image FK
    }
    
    
    

````


    IMAGE ||--|| IG_USER: "u. created from"
    IMAGE ||--|| HASHTAG: "i. created from"
    
    HASHTAG }|--|| PROJECT: "h. under"
    IMAGE }|--|| PROJECT: "i. under"
    IG_USER }|--|| PROJECT: "i. under"
    USER_HASHTAG_USE }|--|| PROJECT: "u. under"
    
    IG_USER }|--|| USER_HASHTAG_USE: ""
    HASHTAG }|--|| USER_HASHTAG_USE: ""
    IMAGE }|--|| USER_HASHTAG_USE: ""
    
    IMAGE o|--|o IMAGE : ""
    IMAGE_CROP o|--|| IMAGE : ""
    IMAGE_DATA o|--|| IMAGE: ""
    
    PROJECT_DEFAULT_CROP }o--|| PROJECT : ""
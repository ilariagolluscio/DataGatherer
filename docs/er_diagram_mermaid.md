# ER Diagram

````mermaid

erDiagram
    PROJECT {
        string Name
    }

    IMAGE {
        int id
        bool red_isDataGathered
        string fileName
        int project FK
    }

    IMG_DATA {
        string tag
        string content
        int image FK
    }

    USER {
        string Description
        string Username FK
    }
    
    USER_HASHTAG_USE {
        int amount 
        int user_id FK
        int hashtag_id FK 
    }

    HASHTAG {
        string Content
        int igData FK
    }

    IMG_CROP {
        string fieldName
        float top_x
        float top_y
        float height
        float width
        string recognizedText
        int image FK
    }


    PROJECT ||--|{ IMAGE : "has"
    IMAGE ||--|o IMG_DATA : "has"
    IMAGE ||--o{ IMG_CROP : "has"
    
    USER_HASHTAG_USE ||--|| USER : "has"
    USER_HASHTAG_USE ||--|| HASHTAG : "has"
    

````
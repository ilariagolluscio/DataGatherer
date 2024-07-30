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

    IG_DATA {
        string Username
        int image FK
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
    IMAGE ||--|o IG_DATA : "has"
    IG_DATA ||--o{ HASHTAG : "has"
    IMAGE ||--o{ IMG_CROP : "has"

````
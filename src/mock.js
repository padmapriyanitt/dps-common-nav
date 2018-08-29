let menu = [
    {
        "id": 1,
        "name": "clusters",
        "displayName": "Clusters",
        "link": "clusters",
        "parentId": 1,
        "position": 0,
        "subMenu": [
            {
                "id": 3,
                "name": "templates",
                "displayName": "Templates",
                "link": "templates",
                "parentId": 1,
                "position": 1,
                "subMenu": [
                    {
                        "id": 7,
                        "name": "test",
                        "displayName": "Test",
                        "link": "test",
                        "parentId": 4,
                        "position": 3,
                        "subMenu": []
                    }
                ]
            },
            {
                "id": 4,
                "name": "blueprints",
                "displayName": "Blue Prints",
                "link": "blueprints",
                "parentId": 2,
                "position": 1,
                "subMenu": []
            },
            {
                "id": 5,
                "name": "recipes",
                "displayName": "Recipes",
                "link": "recipes",
                "parentId": 3,
                "position": 1,
                "subMenu": []
            },
            {
                "id": 6,
                "name": "subscription",
                "displayName": "Subscription",
                "link": "subscription",
                "parentId": 4,
                "position": 1,
                "subMenu": []
            }
        ]
    },
    {
        "id": 2,
        "name": "cloud_manager",
        "displayName": "Cloud Manager",
        "link": "cloud-manager",
        "parentId": 1,
        "position": 0,
        "subMenu": []
    }
]

export default menu
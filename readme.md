# Room Custom Post Type

This plugin enables a room custom post type in WordPress. Along with the custom post type, it enables custom meta data to be edited and stored for the room post.

## Development

Checkout this repo and run `npm install` to install dependencies, then `npm run start` to watch for changes.

When finished, run `npm run build` to build the plugin for production usage.

## Usage

-   Install the plugin and enable in the plugins directory.
-   You should now have a "Rooms" link in the left hand menu bar which will allow you to create Room posts.
-   Create a Room post and then add the `Room Post Type` block to the post
-   A new "Room Meta" section should now be visible in the sidebar
-   Enter the required meta data about the room and then press "Save" or "Update" to save the changes

### Theme

In your theme, create a `single-room.html` template to display the Room page. This plugin has a build in block to display the meta data in the template.

To output a single item, just supply the key as an attribute.

```
<!-- wp:room-post-type/meta-field {"key":"theatre_occupancy"} /-->
```

To output an array of items as a list, set list to true in the attributes.

```
<!-- wp:room-post-type/meta-field {"key":"audio_equipment","list":true} /-->
```

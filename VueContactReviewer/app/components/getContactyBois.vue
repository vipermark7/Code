<template>
    <Page class="page">
        <ActionBar title="Home" class="action-bar" />
        <ScrollView>
            <StackLayout class="home-panel">
                <!--Add your page content here-->
                <Button text="Button" @tap="getContactyBois" />
                <Label textWrap="true" text="Play with NativeScript!" class="h2 description-label" />
                <Label textWrap="true" text="Write code in the editor or drag and drop components to build a NativeScript mobile application."
                    class="h2 description-label" />
                <Label textWrap="true" text="Scan the QR code with your mobile device and watch the changes sync live while you play with the code."
                    class="h2 description-label" <ListView class="list-group"
                    for="country in countries" @itemTap="onItemTap" style="height:1250px">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Image :src="country.imageSrc" class="thumb img-circle" />
                            <Label :text="country.name" class="list-group-item-heading"
                                style="width: 60%" />
                        </FlexboxLayout>
                    </v-template>
                    </ListView> />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import contacts from 'nativescript-contacts';
    import permissions from 'nativescript-permissions';

    export default {
        methods: {
            getContactyBois() {
                var contacts = require("nativescript-contacts");
                /* Optional: contactFields contains
			the fields to retrieve from native backend to reduce //processing time var contactFields = //['name','organization','nickname','notes','photo','urls',
			'phoneNumbers','emailAddresses','postalAddresses'] If not supplied, all available contactFields will be returned. */
                const permissions = require('nativescript-permissions');
                var perm = permissions.requestPermission(android.Manifest
                    .permission.READ_CONTACTS,
                    'Please click allow to fetch contacts from your phone '
                );
                perm.then(() => {
                    var contactFields = ["name", "phoneNumbers"];
                    contacts.getAllContacts(contactFields).then(
                        function(args) {
                            console.log("getAllContacts Complete");
                            console.log(JSON.stringify(args));
                            /// Returns args: /// args.data: //Generic cross platform JSON object, null if no objects were found
                            //function(err) { //
                            //console.log("Error: " + err); //
                        }
                    )
                });
            },
            data() {
                return {};
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style

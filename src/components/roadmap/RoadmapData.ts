export type RoadMapAction = {title: string; moreInfo?: string[]};
type RoadMapEntry = {
  title: string;
  descriptor?: string;
  actions: RoadMapAction[];
};

export const roadmap: RoadMapEntry[] = [
  {
    title: 'Short Term',
    descriptor:
      'This will be the first release of the app. A simple, useful and usable product',
    actions: [
      {
        title: 'Reorder steps',
        moreInfo: [
          'Allow the user to reorder the method steps by dragging. This is more complicated than the other "drag to sort" functions due to the variable height of the step element',
        ],
      },
      {
        title: 'Add amount and unit inputs to new Shopping list entry',
        moreInfo: [
          'users will be able to add an amount and unit to each shopping list entry, same as is currently for adding a new ingredient',
        ],
      },
      {
        title: 'Add new Shopping lists',
        moreInfo: [
          'Allow users to create multiple shopping lists',
          'Allow users to select which shopping list they want to use when adding Ingredient to the shopping list from the ingredients section',
        ],
      },
      {
        title: 'Recipe Options',
        moreInfo: [
          'A user will be able to long press on a recipe which will show options "Add all ingredients to shopping list", and "Delete Recipe"',
        ],
      },
      {
        title: 'Shopping List Options',
        moreInfo: [
          'A tab bar will appear at the bottom of the screen with actions for the following:',
          "Mark all 'Unfound'",
          "Mark all 'Found'",
          'Delete All',
          'Delete all found items',
        ],
      },
    ],
  },
  {
    title: 'Medium Term',
    descriptor:
      'This will be the next version of the app, with some slightly more advanced features making the app more intuitive',
    actions: [
      {
        title: 'Attach a timer function to a Method step',
        moreInfo: [
          "When creating a step, you'll have the option to attach a timer where you select the duration",
          "When in the method section, if there's a timer attached to a step, a 'start timer' button will appear",
          'This timer will then appear in the header with a progress bar showing how much time is left. It will be cancelable',
          'when the timer is complete, a local notification / alarm buzzer will sound',
        ],
      },
      {
        title: 'Create an interactive "Cook" view',
        moreInfo: [
          'This will allow the user to move through the recipe step my step rather than reading through the list. Similar feel to Instagram stories. Needs more thought / UX.',
        ],
      },
      {
        title: 'Add tags to recipes',
        moreInfo: [
          'Users will be able to attach tags to recipes, such as "Main", "Dessert" etc',
        ],
      },
      {
        title: 'Add recipe search function',
        moreInfo: [
          'A search bar will appear at the top of the home recipes page where you can search for recipes by title or tag',
        ],
      },
      {
        title: 'Smart add to shopping list',
        moreInfo: [
          'When you add ites (either individually or through a recipe), items that already exist in a shopping list will not get re-added. Rather, it will adjust the amounts of those ingredients.',
          'There will be a setting to enable / disable smart add to list',
        ],
      },
      {
        title: 'Allow users to attach a photo to a recipe',
        moreInfo: [
          "Users can add a 'profile' picture to the recipe",
          'Investigate whether it would be useful to have an associated gallery per recipe',
        ],
      },
    ],
  },
  {
    title: 'Long Term',
    descriptor: 'The potential monetizing phase',
    actions: [
      {
        title: 'Account Creation',
        moreInfo: [
          'users will be able to create an account, and save their data online.',
          'This will enable users to use multiple devices and sync all data',
        ],
      },
      {
        title: 'Share a recipe',
        moreInfo: [
          'Users will be able to share a recipe with their friends. Implementation details still to be decided',
        ],
      },
      {
        title: 'Shared lists',
        moreInfo: [
          'Users will be able to share shopping lists with others, allowing users with acces to add, remove and update the "found" status which will update on all users\' devices',
        ],
      },
    ],
  },
];

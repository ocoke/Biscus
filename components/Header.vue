<script setup>
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
  Popover, PopoverButton, PopoverPanel,
  Menu, MenuButton, MenuItems, MenuItem,
} from '@headlessui/vue'
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from '@heroicons/vue/24/outline'

const data = useAppConfig().biscus.nav
const { $colorMode } = useNuxtApp()
const mobileMenuOpen = ref(false)
const toggleTheme = () => {
  switch($colorMode.preference) {
  case 'system':
    $colorMode.preference = 'light'
    break
  case 'light':
    $colorMode.preference = 'dark'
    break
  case 'dark':
    $colorMode.preference = 'system'
    break
  }
}
</script>

<template>
  <header class="bg-white dark:bg-gray-950 dark:text-gray-200">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink
          :to="data.home"
          class="-m-1.5 p-1.5"
        >
          <span class="h-8 w-auto font-bold">{{ data.title }}</span>
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <Menu
          as="div"
          class="relative inline-block text-left mr-3"
        >
          <div>
            <MenuButton
              class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium dark:text-white hover:bg-gray-100 dark:bg-gray-950 transition-all dark:hover:bg-gray-900 text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            >
              Theme <ChevronDownIcon class="ml-2 h-5 w-5" />
            </MenuButton>
          </div>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black/5 focus:outline-none dark:bg-gray-900"
            >
              <div class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button
                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                    @click="$colorMode.preference = 'system'"
                  >
                    <ComputerDesktopIcon
                      :active="active"
                      class="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    System
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                    @click="$colorMode.preference = 'light'"
                  >
                    <SunIcon
                      :active="active"
                      class="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Light
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button
                    class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                    @click="$colorMode.preference = 'dark'"
                  >
                    <MoonIcon
                      :active="active"
                      class="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Dark
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>

        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open Menu</span>
          <Bars3Icon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <Menu
        as="div"
        class="relative lg:inline-block text-left mr-3 hidden"
        style="margin-top: 0.05rem;"
      >
        <div>
          <MenuButton
            class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium dark:text-white hover:bg-gray-100 dark:bg-gray-950 transition-all dark:hover:bg-gray-900 text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
          >
            Theme <ChevronDownIcon class="ml-2 h-5 w-5" />
          </MenuButton>
        </div>

        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white ring-1 ring-black/5 focus:outline-none dark:bg-gray-900"
          >
            <div class="px-1 py-1">
              <MenuItem v-slot="{ active }">
                <button
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                  @click="$colorMode.preference = 'system'"
                >
                  <ComputerDesktopIcon
                    :active="active"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  System
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                  @click="$colorMode.preference = 'light'"
                >
                  <SunIcon
                    :active="active"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Light
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button
                  class="group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950"
                  @click="$colorMode.preference = 'dark'"
                >
                  <MoonIcon
                    :active="active"
                    class="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Dark
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>

      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <NuxtLink
          v-for="n in data.links"
          :to="(n.href)"
          class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200"
        >
          {{ n.name }}
        </NuxtLink>
      </PopoverGroup>
    </nav>
    <Dialog
      as="div"
      class="lg:hidden"
      :open="mobileMenuOpen"
      @close="mobileMenuOpen = false"
    >
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white dark:bg-gray-950 dark:text-gray-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        style="z-index: 9999;"
      >
        <div class="flex items-center justify-between">
          <NuxtLink
            :to="data.home"
            class="-m-1.5 p-1.5"
          >
            <span class="h-8 w-auto font-bold">{{ data.title }}</span>
          </NuxtLink>
          <button
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-100"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close Menu</span>
            <XMarkIcon
              class="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink
                v-for="n in data.links"
                :to="(n.href)"
                class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {{ n.name }}
              </NuxtLink>
            </div>
          
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>
<template>
  <div class="py-4">
    <!-- content -->
    <div class="flex flex-col md:flex-row md:space-x-4 w-full">
      <!-- Subsystems list -->
      <div class="sm:w-2/5 mb-8 sm:mb-4">
        <div>
          <div class="flow-root mt-6">
            <ul class="-my-5 divide-y divide-gray-200">
              <!-- Service list entries -->
              <li
                v-for="service in serviceList"
                :key="service.name"
                class="py-4"
              >
                <div class="flex items-center space-x-4">
                  <div class="flex-shrink-0">
                    <img
                      class="h-8 w-8"
                      :src="
                        require(`~/assets/images/logos/${service.logo}.svg`)
                      "
                      :alt="service.name"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ service.name }}
                    </p>
                    <p class="text-sm text-gray-500 truncate">
                      {{ service.info }}
                    </p>
                  </div>
                  <div>
                    <a
                      :href="service.link"
                      target="_blank"
                      class="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Information list of each subsystem -->
      <div class="w-full p-4 space-y-10 bg-gray-100 rounded-md">
        <!-- Swarmpit -->
        <div class="space-y-4">
          <!-- divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex items-center justify-between">
              <span class="pr-3 bg-gray-100 text-lg font-medium text-gray-900">
                Swarmpit
              </span>
              <a
                :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/stacks/swarmpit`"
                target="_blank"
                class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <!-- Heroicon name: external-link -->
                <svg
                  class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                <span>Show Stack</span>
              </a>
            </div>
          </div>
          <!-- service list -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="service in swarmpitServices" :key="service.id">
                <a
                  :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/${service.serviceName}`"
                  target="_blank"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-orange-600 truncate">
                        {{ service.serviceName }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <span
                          :class="[
                            service.state == 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800',
                            service.state == 'running'
                              ? 'bg-green-100 text-green-800'
                              : '',
                            service.state == 'updating'
                              ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                              : '',
                          ]"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
                        >
                          {{ service.state.toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- simpleicons name: docker -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
                            />
                          </svg>
                          {{ service.repository.image }}
                        </p>
                        <div
                          v-if="service.ports.length > 0"
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                        >
                          <!-- Heroicon name: globe -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div
                            v-for="port in service.ports"
                            :key="port.hostPort"
                            class="flex"
                          >
                            <p class="mr-3">
                              {{ port.hostPort }} [{{ port.protocol }}]
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                      >
                        <!-- Heroicon name: clock -->
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>
                          Running since
                          {{ $moment(service.updatedAt).fromNow(true) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Gitlab -->
        <div class="space-y-4">
          <!-- divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex items-center justify-between">
              <span class="pr-3 bg-gray-100 text-lg font-medium text-gray-900">
                GitLab
              </span>
              <a
                :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/stacks/gitlab`"
                target="_blank"
                class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <!-- Heroicon name: external-link -->
                <svg
                  class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                <span>Show Stack</span>
              </a>
            </div>
          </div>
          <!-- service list -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="service in gitlabServices" :key="service.id">
                <a
                  :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/${service.serviceName}`"
                  target="_blank"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-orange-600 truncate">
                        {{ service.serviceName }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <span
                          :class="[
                            service.state == 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800',
                            service.state == 'running'
                              ? 'bg-green-100 text-green-800'
                              : '',
                            service.state == 'updating'
                              ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                              : '',
                          ]"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
                        >
                          {{ service.state.toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- simpleicons name: docker -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
                            />
                          </svg>
                          {{ service.repository.image }}
                        </p>
                        <div
                          v-if="service.ports.length > 0"
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                        >
                          <!-- Heroicon name: globe -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div
                            v-for="port in service.ports"
                            :key="port.hostPort"
                            class="flex"
                          >
                            <p class="mr-3">
                              {{ port.hostPort }} [{{ port.protocol }}]
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                      >
                        <!-- Heroicon name: clock -->
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>
                          Running since
                          {{ $moment(service.updatedAt).fromNow(true) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- InfluxDB -->
        <div class="space-y-4">
          <!-- divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex items-center justify-between">
              <span class="pr-3 bg-gray-100 text-lg font-medium text-gray-900">
                InfluxDB
              </span>
              <a
                :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/influxdb2_0`"
                target="_blank"
                class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <!-- Heroicon name: external-link -->
                <svg
                  class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                <span>Show Service</span>
              </a>
            </div>
          </div>
          <!-- service list -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="service in influxdbServices" :key="service.id">
                <a
                  :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/${service.serviceName}`"
                  target="_blank"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-orange-600 truncate">
                        {{ service.serviceName }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <span
                          :class="[
                            service.state == 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800',
                            service.state == 'running'
                              ? 'bg-green-100 text-green-800'
                              : '',
                            service.state == 'updating'
                              ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                              : '',
                          ]"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
                        >
                          {{ service.state.toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- simpleicons name: docker -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
                            />
                          </svg>
                          {{ service.repository.image }}
                        </p>
                        <div
                          v-if="service.ports.length > 0"
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                        >
                          <!-- Heroicon name: globe -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div
                            v-for="port in service.ports"
                            :key="port.hostPort"
                            class="flex"
                          >
                            <p class="mr-3">
                              {{ port.hostPort }} [{{ port.protocol }}]
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                      >
                        <!-- Heroicon name: clock -->
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>
                          Running since
                          {{ $moment(service.updatedAt).fromNow(true) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          <!-- Telegraf -->
          <h2
            class="pt-2 text-gray-500 text-xs font-medium uppercase tracking-wide"
          >
            Telegraf Data Connection Services
          </h2>
          <!-- telegraf service list -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="service in telegrafServices" :key="service.id">
                <a
                  :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/${service.serviceName}`"
                  target="_blank"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <div class="sm:flex w-8/12 sm:w-full">
                        <p
                          class="sm:w-6/12 text-sm font-medium text-orange-600 truncate"
                        >
                          {{ service.serviceName }}
                        </p>
                        <p
                          class="sm:w-3/12 flex items-center text-sm text-gray-500"
                        >
                          <!-- simpleicons name: docker -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
                            />
                          </svg>
                          {{ service.repository.image }}
                        </p>
                        <div
                          class="sm:w-4/12 mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                        >
                          <!-- Heroicon name: clock -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <p>
                            Update
                            {{ $moment(service.updatedAt).fromNow(true) }} ago
                          </p>
                        </div>
                      </div>
                      <div class="flex-shrink-0 flex">
                        <span
                          :class="[
                            service.state == 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800',
                            service.state == 'running'
                              ? 'bg-green-100 text-green-800'
                              : '',
                            service.state == 'updating'
                              ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                              : '',
                          ]"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
                        >
                          {{ service.state.toUpperCase() }}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- NodeRed -->
        <div class="space-y-4">
          <!-- divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex items-center justify-between">
              <span class="pr-3 bg-gray-100 text-lg font-medium text-gray-900">
                NodeRed
              </span>
              <a
                :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/stacks/node-red`"
                target="_blank"
                class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <!-- Heroicon name: external-link -->
                <svg
                  class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                <span>Show Stack</span>
              </a>
            </div>
          </div>
          <!-- service list -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="service in noderedServices" :key="service.id">
                <a
                  :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/${service.serviceName}`"
                  target="_blank"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-orange-600 truncate">
                        {{ service.serviceName }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <span
                          :class="[
                            service.state == 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800',
                            service.state == 'running'
                              ? 'bg-green-100 text-green-800'
                              : '',
                            service.state == 'updating'
                              ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                              : '',
                          ]"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
                        >
                          {{ service.state.toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- simpleicons name: docker -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
                            />
                          </svg>
                          {{ service.repository.image }}
                        </p>
                        <div
                          v-if="service.ports.length > 0"
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                        >
                          <!-- Heroicon name: globe -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div
                            v-for="port in service.ports"
                            :key="port.hostPort"
                            class="flex"
                          >
                            <p class="mr-3">
                              {{ port.hostPort }} [{{ port.protocol }}]
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                      >
                        <!-- Heroicon name: clock -->
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>
                          Running since
                          {{ $moment(service.updatedAt).fromNow(true) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Grafana -->
        <div class="space-y-4">
          <!-- divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex items-center justify-between">
              <span class="pr-3 bg-gray-100 text-lg font-medium text-gray-900">
                Grafana
              </span>
              <a
                :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/grafana`"
                target="_blank"
                class="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <!-- Heroicon name: external-link -->
                <svg
                  class="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
                <span>Show Service</span>
              </a>
            </div>
          </div>
          <!-- service list -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="service in grafanaServices" :key="service.id">
                <a
                  :href="`${$nuxt.context.env.SWARMPIT_BASEURL}/#/services/${service.serviceName}`"
                  target="_blank"
                  class="block hover:bg-gray-50"
                >
                  <div class="px-4 py-4 sm:px-6">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-medium text-orange-600 truncate">
                        {{ service.serviceName }}
                      </p>
                      <div class="ml-2 flex-shrink-0 flex">
                        <span
                          :class="[
                            service.state == 'failed'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800',
                            service.state == 'running'
                              ? 'bg-green-100 text-green-800'
                              : '',
                            service.state == 'updating'
                              ? 'bg-yellow-100 text-yellow-800 animate-pulse'
                              : '',
                          ]"
                          class="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
                        >
                          {{ service.state.toUpperCase() }}
                        </span>
                      </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                      <div class="sm:flex">
                        <p class="flex items-center text-sm text-gray-500">
                          <!-- simpleicons name: docker -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              xmlns="http://www.w3.org/2000/svg"
                              d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"
                            />
                          </svg>
                          {{ service.repository.image }}
                        </p>
                        <div
                          v-if="service.ports.length > 0"
                          class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6"
                        >
                          <!-- Heroicon name: globe -->
                          <svg
                            class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <div
                            v-for="port in service.ports"
                            :key="port.hostPort"
                            class="flex"
                          >
                            <p class="mr-3">
                              {{ port.hostPort }} [{{ port.protocol }}]
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                      >
                        <!-- Heroicon name: clock -->
                        <svg
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p>
                          Running since
                          {{ $moment(service.updatedAt).fromNow(true) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "application-second-nav",
  data: function () {
    return {
      refreshIntervalID: null,
      serviceList: [
        {
          name: "Swarmpit",
          logo: "swarmpit-logo",
          info: "Manage your Docker Swarm cluster",
          link: process.env.SWARMPIT_BASEURL,
        },
        {
          name: "GitLab",
          logo: "gitlab-logo",
          info: "The complete DevOps platform",
          link: process.env.GITLAB_BASEURL,
        },
        {
          name: "InfluxDB",
          logo: "influxdb-logo",
          info: "Open Source Time Series Database",
          link: process.env.INFLUXDB_BASEURL,
        },
        {
          name: "NodeRed",
          logo: "nodered-logo",
          info: "Low-code Programming platform",
          link: process.env.NODERED_BASEURL,
        },
        {
          name: "Grafana",
          logo: "grafana-logo",
          info: "Analytics & Monitoring solution",
          link: process.env.GRAFANA_BASEURL,
        },
      ],
    };
  },
  beforeDestroy: function () {
    this.stopInterval();
  },
  computed: {
    swarmpitServices() {
      return this.$store.getters["containerServices/getServicesByStackname"](
        "swarmpit"
      );
    },
    gitlabServices() {
      return this.$store.getters["containerServices/getServicesByStackname"](
        "gitlab"
      );
    },
    influxdbServices() {
      return this.$store.getters["containerServices/getServicesByImageName"](
        "toblu/influxdb2"
      );
    },
    telegrafServices() {
      return this.$store.getters["containerServices/getServicesByImageName"](
        "telegraf"
      );
    },
    noderedServices() {
      return this.$store.getters["containerServices/getServicesByStackname"](
        "node-red"
      );
    },
    grafanaServices() {
      return this.$store.getters["containerServices/getServicesByImageName"](
        "grafana/grafana"
      );
    },
  },
  async mounted() {
    this.refreshInterval(10);
  },
  methods: {
    stopInterval() {
      clearInterval(this.refreshIntervalID);
    },
    refreshInterval(interval) {
      let self = this;
      this.stopInterval();

      self.$store.commit("containerServices/updateServices");
      if (interval != 0) {
        console.log("just created a new interval [" + interval + "s]");
        this.refreshIntervalID = setInterval(async function () {
          self.$store.commit("containerServices/updateServices");
        }, interval * 1000);
      }
    },
  },
};
</script>

<style>
</style>
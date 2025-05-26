<template>
  <div class="p-6 max-w-6xl mx-auto" id="media">
    <h2 class="text-3xl font-bold mb-4 text-[#593a28]">Наші зали</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        v-for="(gallery, index) in galleries"
        :key="index"
        class="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
        @click="openGallery(index)"
      >
        <h3 class="text-xl font-semibold text-[#0d0000]">{{ gallery.title }}</h3>
      </div>
    </div>

    <!-- Modal slider -->
    <div v-if="activeGallery !== null" class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div class="relative bg-white max-w-3xl w-full rounded-lg overflow-hidden shadow-lg">
        <button
          @click="closeGallery"
          class="absolute top-2 right-2 text-black text-xl hover:text-red-600"
        >✕</button>

        <div class="flex items-center justify-between px-4 py-2">
          <button @click="prevImage" class="text-2xl text-[#593a28]">⟨</button>
          <img
            :src="currentImage"
            class="max-h-[70vh] object-contain mx-4 transition"
            :alt="galleries[activeGallery].title"
          />
          <button @click="nextImage" class="text-2xl text-[#593a28]">⟩</button>
        </div>

        <div class="text-center py-2 text-sm text-gray-500">
          {{ currentIndex + 1 }} з {{ galleries[activeGallery].images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const galleries = [
  {
    title: 'Гімнастичний зал',
    images: [
      '/media/gym1.jpg',
      '/media/gym2.jpg',
      '/media/gym3.jpg',
    ],
  },
  {
    title: 'Боксерський зал',
    images: [
      '/media/boxing1.jpg',
      '/media/boxing2.jpg',
    ],
  },
  {
    title: 'Плавальний басейн',
    images: [
      '/media/pool1.jpg',
      '/media/pool2.jpg',
      '/media/pool3.jpg',
    ],
  },
]

const activeGallery = ref(null)
const currentIndex = ref(0)

const openGallery = (index) => {
  activeGallery.value = index
  currentIndex.value = 0
}

const closeGallery = () => {
  activeGallery.value = null
}

const prevImage = () => {
  if (activeGallery.value !== null) {
    currentIndex.value =
      (currentIndex.value - 1 + galleries[activeGallery.value].images.length) %
      galleries[activeGallery.value].images.length
  }
}

const nextImage = () => {
  if (activeGallery.value !== null) {
    currentIndex.value =
      (currentIndex.value + 1) % galleries[activeGallery.value].images.length
  }
}

const currentImage = computed(() =>
  activeGallery.value !== null
    ? galleries[activeGallery.value].images[currentIndex.value]
    : ''
)
</script>

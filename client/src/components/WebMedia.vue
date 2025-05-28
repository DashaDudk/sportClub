<template>
  <div class="p-6 max-w-6xl mx-auto" id="media">
    <h2 class="text-4xl font-bold mb-8 text-[#593a28] tracking-wide gallery-title">
      Наші зали
    </h2>
    <div class="horizontal-scroll-wrapper">
  <div
    v-for="(gallery, index) in galleries"
    :key="index"
    class="gallery-card-inline"
    @click="openGallery(index)"
  >
    <div class="gallery-img-container">
      <img
        :src="gallery.images[0]"
        alt="preview"
        class="gallery-img"
      />
    </div>
    <h3 class="gallery-title-text">{{ gallery.title }}</h3>
  </div>
</div>

    <!-- Modal -->
    <div v-if="activeGallery !== null" class="modal-overlay">
      <div class="modal-box-gallery">
        <button @click="closeGallery" class="modal-close-btn">✕</button>

        <div class="modal-content">
          <button @click="prevImage" class="arrow-btn">⟨</button>
          <img :src="currentImage" class="modal-img" />
          <button @click="nextImage" class="arrow-btn">⟩</button>
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
      '/media/gymg1.jpg',
      '/media/gymg2.jpg',
      '/media/gymg3.jpg',
    ],
  },
  {
    title: 'Боксерський зал',
    images: [
      '/media/box1.jpg',
      '/media/box2.jpg',
      '/media/box3.jpg',
      '/media/box4.jpg',
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
  {
    title: 'Тренажерний зал',
    images: [
      '/media/gym1.jpg',
      '/media/gym2.jpg',
      '/media/gym3.jpg',
      '/media/gym4.jpg',
    ],
  },
  {
    title: 'Футбольний зал',
    images: [
      '/media/foot4.jpg',
      '/media/foot2.jpg',
      '/media/foot1.jpg',
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

<style scoped>
.horizontal-scroll-wrapper {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 1.5rem;
  padding-bottom: 1rem;
  scrollbar-width: thin;
}

.gallery-card-inline {
  flex: 0 0 auto;
  width: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-card-inline:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}


.gallery-title {
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
  color: var(--hover-bg);
  text-shadow: 1px 1px 3px #aaa;
  margin-top:-1650px;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 3.0rem;
}

.gallery-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-card:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.gallery-img-container {
  height: 220px;
  overflow: hidden;
  border-bottom: 1px solid var(--main-bg);
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-card:hover .gallery-img {
  transform: scale(1.05);
}

.gallery-title-text {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: var(--hover-bg);
  padding: 16px;
  font-family: 'Montserrat Alternates', sans-serif;
}

/* Modal custom */
.modal-box-gallery {
  background-color: var(--main-bg);
  padding: 1.5rem;
  border-radius: 20px;
  width: 80%;
  max-width: 800px;
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease-out;
}

.modal-img {
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.modal-close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  color: var(--hover-bg);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.modal-close-btn:hover {
  color: #ff6b6b;
}

.arrow-btn {
  font-size: 32px;
  background: transparent;
  border: none;
  color: var(--hover-bg);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.arrow-btn:hover {
  transform: scale(1.2);
}

/* Fancy entry animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


</style>
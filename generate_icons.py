import os
from PIL import Image

def generate_icons():
    base_file = r'C:\Users\my\Desktop\ZexAi\zexailogo (1)1.png'
    if not os.path.exists(base_file):
        print("Base logo not found:", base_file)
        return

    img = Image.open(base_file)

    # 1. Favicon for frontend-new
    favicon_path1 = r'C:\Users\my\Desktop\ZexAi\Zex\frontend-new\public\favicon.ico'
    if os.path.exists(os.path.dirname(favicon_path1)):
        # Generate ico with multiple sizes for better compatibility
        img.save(favicon_path1, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        print(f"Updated {favicon_path1}")

    favicon_path2 = r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\favicon.ico'
    if os.path.exists(os.path.dirname(favicon_path2)):
        img.save(favicon_path2, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        print(f"Updated {favicon_path2}")

    # 2. General PNG icons
    icon_paths = {
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend-new\public\logo192.png': (192, 192),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend-new\public\logo512.png': (512, 512),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend-new\src\logo.png': (512, 512), # For replacing the svg
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-72.png': (72, 72),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-96.png': (96, 96),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-128.png': (128, 128),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-144.png': (144, 144),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-152.png': (152, 152),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-192.png': (192, 192),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-384.png': (384, 384),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-512.png': (512, 512),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-maskable-192.png': (192, 192),
        r'C:\Users\my\Desktop\ZexAi\Zex\frontend\public\icons\icon-maskable-512.png': (512, 512),
    }

    for path, size in icon_paths.items():
        if os.path.exists(os.path.dirname(path)):
            resized_img = img.resize(size, Image.Resampling.LANCZOS)
            resized_img.save(path, format='PNG')
            print(f"Updated {path}")
            
    print("Done generating icons.")

if __name__ == '__main__':
    generate_icons()

import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_og_image():
    W, H = 1200, 630
    
    # 1. Background Gradient (deep luxury royal wine & warm glow)
    bg = Image.new("RGB", (W, H))
    draw_bg = ImageDraw.Draw(bg)
    for y in range(H):
        ratio = y / H
        # Vertical blend with richer gradient
        r = int(52 + 38 * math.sin(ratio * math.pi) - 14 * ratio)
        g = int(20 + 20 * math.sin(ratio * math.pi) - 7 * ratio)
        b = int(25 + 22 * math.sin(ratio * math.pi) - 8 * ratio)
        draw_bg.line([(0, y), (W, y)], fill=(r, g, b))
    
    # Add warm radial glows
    glow_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_overlay)
    
    # Glow behind baby (center ~ (925, 315))
    glow_center_x, glow_center_y = 925, 315
    for radius in range(350, 0, -10):
        alpha = int(45 * (1 - radius / 350))
        glow_draw.ellipse(
            [glow_center_x - radius, glow_center_y - radius, glow_center_x + radius, glow_center_y + radius],
            fill=(235, 165, 100, alpha)
        )
        
    # Glow behind left title
    for radius in range(260, 0, -12):
        alpha = int(30 * (1 - radius / 260))
        glow_draw.ellipse(
            [260 - radius, 220 - radius, 260 + radius, 220 + radius],
            fill=(225, 100, 125, alpha)
        )
        
    bg.paste(glow_overlay, (0, 0), glow_overlay)
    
    # 2. Golden sparkles and bokeh stars
    sparkle_overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sp_draw = ImageDraw.Draw(sparkle_overlay)
    
    # Small bokeh dots
    bokeh_points = [
        (100, 80, 8, 30), (320, 70, 6, 25), (600, 110, 10, 35),
        (720, 80, 7, 30), (1120, 90, 9, 35), (1140, 480, 8, 30),
        (650, 520, 7, 25), (80, 540, 10, 30), (450, 560, 6, 25),
        (760, 280, 8, 40), (1080, 240, 7, 35), (840, 120, 9, 45)
    ]
    for bx, by, br, b_alpha in bokeh_points:
        sp_draw.ellipse([bx - br, by - br, bx + br, by + br], fill=(255, 230, 160, b_alpha))
        
    # 4-pointed golden sparkle stars function
    def draw_star(draw, cx, cy, size, fill):
        r_inner = size * 0.22
        points = []
        for i in range(8):
            ang = i * math.pi / 4
            r = size if i % 2 == 0 else r_inner
            points.append((cx + r * math.cos(ang), cy + r * math.sin(ang)))
        draw.polygon(points, fill=fill)

    stars = [
        (80, 180, 14, (255, 225, 150, 180)),
        (560, 90, 16, (255, 240, 180, 220)),
        (680, 260, 12, (255, 220, 140, 170)),
        (1130, 180, 18, (255, 240, 180, 230)),
        (720, 490, 15, (255, 225, 150, 190)),
        (1100, 530, 14, (255, 235, 170, 190)),
        (830, 80, 20, (255, 245, 200, 240)),
        (520, 420, 11, (255, 220, 140, 160)),
        (70, 480, 12, (255, 220, 140, 150)),
    ]
    for sx, sy, ssize, sfill in stars:
        draw_star(sp_draw, sx, sy, ssize, sfill)
        
    bg.paste(sparkle_overlay, (0, 0), sparkle_overlay)
    
    # 3. Dual Gold Ornamental Inset Border
    border_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b_draw = ImageDraw.Draw(border_layer)
    # Outer frame
    b_draw.rounded_rectangle([24, 24, W - 24, H - 24], radius=16, outline=(201, 170, 114, 180), width=2)
    # Inner thin frame
    b_draw.rounded_rectangle([32, 32, W - 32, H - 32], radius=12, outline=(236, 220, 185, 90), width=1)
    
    # Corner ornaments
    corners = [(32, 32), (W - 32, 32), (32, H - 32), (W - 32, H - 32)]
    for cx_c, cy_c in corners:
        draw_star(b_draw, cx_c, cy_c, 8, (255, 230, 160, 220))
        
    bg.paste(border_layer, (0, 0), border_layer)

    # 4. Baby Princess Portrait Medallion (Right Side)
    cx, cy = 925, 305
    radius = 215
    
    # Circular base for baby with radiant warm blush/cream
    medallion = Image.new("RGBA", (radius * 2 + 50, radius * 2 + 50), (0, 0, 0, 0))
    m_draw = ImageDraw.Draw(medallion)
    mc = radius + 25
    
    # Soft circular background
    for r in range(radius, 0, -2):
        t = r / radius
        r_col = int(255 - 10 * (1 - t))
        g_col = int(248 - 22 * (1 - t))
        b_col = int(242 - 28 * (1 - t))
        m_draw.ellipse([mc - r, mc - r, mc + r, mc + r], fill=(r_col, g_col, b_col, 255))
        
    # Baby cutout
    baby = Image.open("public/baby-princess.png").convert("RGBA")
    bw, bh = baby.size
    target_h = int(radius * 1.96)
    target_w = int(bw * (target_h / bh))
    baby_resized = baby.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    bx_pos = mc - (target_w // 2)
    by_pos = mc - (target_h // 2) + 16
    medallion.paste(baby_resized, (bx_pos, by_pos), baby_resized)
    
    # Circular mask
    mask = Image.new("L", (radius * 2 + 50, radius * 2 + 50), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.ellipse([mc - radius, mc - radius, mc + radius, mc + radius], fill=255)
    
    # Outer glow
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    halo_draw = ImageDraw.Draw(halo)
    for r in range(radius + 28, radius, -1):
        alpha = int(120 * (1 - (r - radius) / 28))
        halo_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(235, 195, 125, alpha))
    bg.paste(halo, (0, 0), halo)
    
    # Paste masked medallion
    medallion_final = Image.new("RGBA", (radius * 2 + 50, radius * 2 + 50), (0, 0, 0, 0))
    medallion_final.paste(medallion, (0, 0), mask)
    bg.paste(medallion_final, (cx - mc, cy - mc), medallion_final)
    
    # Concentric gold border rings on top of medallion edge
    ring_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    r_draw = ImageDraw.Draw(ring_layer)
    # Outer thick gold ring
    r_draw.ellipse([cx - radius - 3, cy - radius - 3, cx + radius + 3, cy + radius + 3], outline=(236, 220, 185, 255), width=3)
    r_draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], outline=(201, 170, 114, 255), width=3)
    r_draw.ellipse([cx - radius + 5, cy - radius + 5, cx + radius - 5, cy + radius - 5], outline=(160, 118, 55, 140), width=1)
    
    # Draw vector gold crown on top of the portrait
    def draw_vector_crown(draw, crown_cx, crown_cy, crown_w=52, crown_h=30):
        # Base points of crown
        y_top = crown_cy - crown_h // 2
        y_bot = crown_cy + crown_h // 2
        hw = crown_w // 2
        # Crown peaks: Left peak, Left valley, Center peak, Right valley, Right peak
        pts = [
            (crown_cx - hw, y_bot),
            (crown_cx - hw, y_top + 4),
            (crown_cx - hw * 0.5, y_top + 14),
            (crown_cx, y_top),
            (crown_cx + hw * 0.5, y_top + 14),
            (crown_cx + hw, y_top + 4),
            (crown_cx + hw, y_bot),
        ]
        draw.polygon(pts, fill=(245, 215, 135, 255))
        draw.line(pts + [(crown_cx - hw, y_bot)], fill=(255, 240, 185, 255), width=2)
        # Crown jewels
        jewel_col = (255, 245, 205, 255)
        draw.ellipse([crown_cx - hw - 3, y_top + 1, crown_cx - hw + 3, y_top + 7], fill=jewel_col)
        draw.ellipse([crown_cx - 4, y_top - 4, crown_cx + 4, y_top + 4], fill=jewel_col)
        draw.ellipse([crown_cx + hw - 3, y_top + 1, crown_cx + hw + 3, y_top + 7], fill=jewel_col)
        draw.ellipse([crown_cx - hw * 0.5 - 2, y_top + 12, crown_cx - hw * 0.5 + 2, y_top + 16], fill=(232, 96, 122, 255))
        draw.ellipse([crown_cx + hw * 0.5 - 2, y_top + 12, crown_cx + hw * 0.5 + 2, y_top + 16], fill=(232, 96, 122, 255))

    draw_vector_crown(r_draw, cx, cy - radius - 16, 56, 32)
    draw_star(r_draw, cx - 60, cy - radius - 2, 8, (255, 230, 160, 230))
    draw_star(r_draw, cx + 60, cy - radius - 2, 8, (255, 230, 160, 230))
    
    bg.paste(ring_layer, (0, 0), ring_layer)
    
    # Bottom Badge on Medallion: "PRINCESS TURNING ONE"
    pill_w, pill_h = 270, 44
    pill_x1 = cx - pill_w // 2
    pill_y1 = cy + radius - 20
    pill_x2 = pill_x1 + pill_w
    pill_y2 = pill_y1 + pill_h
    
    pill_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(pill_layer)
    # Shadow
    p_draw.rounded_rectangle([pill_x1 + 2, pill_y1 + 3, pill_x2 + 2, pill_y2 + 3], radius=22, fill=(30, 10, 12, 140))
    p_draw.rounded_rectangle([pill_x1, pill_y1, pill_x2, pill_y2], radius=22, fill=(255, 248, 238, 250), outline=(201, 170, 114, 255), width=2)
    bg.paste(pill_layer, (0, 0), pill_layer)
    
    # 5. Load Fonts
    font_playfair = ImageFont.truetype("/tmp/PlayfairDisplay.ttf", 68)
    font_outfit_bold = ImageFont.truetype("/tmp/Outfit.ttf", 23)
    font_outfit_title = ImageFont.truetype("/tmp/Outfit.ttf", 25)
    font_outfit_tag = ImageFont.truetype("/tmp/Outfit.ttf", 15)
    font_outfit_body = ImageFont.truetype("/tmp/Outfit.ttf", 21)
    font_outfit_detail = ImageFont.truetype("/tmp/Outfit.ttf", 20)
    font_pill_text = ImageFont.truetype("/tmp/Outfit.ttf", 16)
    
    text_draw = ImageDraw.Draw(bg)
    
    # Draw pill text: "✦  PRINCESS TURNING ONE  ✦"
    pill_str = "PRINCESS TURNING ONE"
    pbox = font_pill_text.getbbox(pill_str)
    pw = pbox[2] - pbox[0]
    ph = pbox[3] - pbox[1]
    
    # Draw little stars beside pill text
    p_tx = cx - pw // 2
    p_ty = pill_y1 + (pill_h - ph) // 2 - 2
    text_draw.text((p_tx, p_ty), pill_str, font=font_pill_text, fill=(75, 28, 33))
    
    star_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    st_draw = ImageDraw.Draw(star_layer)
    draw_star(st_draw, p_tx - 18, p_ty + ph // 2 + 1, 6, (201, 170, 114, 255))
    draw_star(st_draw, p_tx + pw + 18, p_ty + ph // 2 + 1, 6, (201, 170, 114, 255))
    bg.paste(star_layer, (0, 0), star_layer)

    # 6. Left Content Section
    left_x = 75
    
    # Top Tag badge: "ROYAL 1ST BIRTHDAY INVITATION"
    tag_y = 66
    tag_text = "ROYAL 1ST BIRTHDAY INVITATION"
    tbox = font_outfit_tag.getbbox(tag_text)
    tw = tbox[2] - tbox[0]
    th = tbox[3] - tbox[1]
    
    tag_bg_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    tb_draw = ImageDraw.Draw(tag_bg_layer)
    tag_pad_x = 44
    tb_draw.rounded_rectangle([left_x, tag_y, left_x + tw + tag_pad_x * 2, tag_y + th + 18], radius=15, fill=(95, 38, 44, 220), outline=(201, 170, 114, 180), width=1)
    # Stars on tag sides
    draw_star(tb_draw, left_x + 22, tag_y + (th + 18) // 2, 6, (255, 230, 160, 240))
    draw_star(tb_draw, left_x + tw + tag_pad_x * 2 - 22, tag_y + (th + 18) // 2, 6, (255, 230, 160, 240))
    bg.paste(tag_bg_layer, (0, 0), tag_bg_layer)
    
    text_draw.text((left_x + tag_pad_x, tag_y + 9), tag_text, font=font_outfit_tag, fill=(244, 220, 176))
    
    # Main Name: "Shrishtiika"
    name_y = 126
    # Soft drop shadow for name
    text_draw.text((left_x + 2, name_y + 3), "Shrishtiika", font=font_playfair, fill=(35, 12, 15))
    text_draw.text((left_x, name_y), "Shrishtiika", font=font_playfair, fill=(255, 250, 244))
    
    # Last name: "D W A R A K N A A T H"
    ln_y = name_y + 80
    text_draw.text((left_x + 1, ln_y + 1), "D W A R A K N A A T H", font=font_outfit_title, fill=(35, 12, 15))
    text_draw.text((left_x, ln_y), "D W A R A K N A A T H", font=font_outfit_title, fill=(225, 195, 135))
    
    # Subtitle
    sub_y = ln_y + 44
    text_draw.text((left_x, sub_y), "Cordially invites you to celebrate her 1st birthday!", font=font_outfit_body, fill=(251, 238, 232))
    
    # Divider line with center diamond
    div_y = sub_y + 40
    div_w = 540
    div_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d_draw = ImageDraw.Draw(div_layer)
    d_draw.line([(left_x, div_y), (left_x + 245, div_y)], fill=(201, 170, 114, 140), width=1)
    draw_star(d_draw, left_x + 270, div_y, 8, (255, 230, 160, 230))
    d_draw.line([(left_x + 295, div_y), (left_x + div_w, div_y)], fill=(201, 170, 114, 140), width=1)
    bg.paste(div_layer, (0, 0), div_layer)
    
    # Event Details Box
    card_y = div_y + 18
    card_w = 560
    card_h = 170
    
    card_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card_layer)
    c_draw.rounded_rectangle([left_x, card_y, left_x + card_w, card_y + card_h], radius=18, fill=(45, 16, 20, 170), outline=(201, 170, 114, 100), width=1)
    
    # Vector Icons in PIL:
    # 1. Calendar Icon at (left_x + 26, card_y + 20)
    cal_x, cal_y = left_x + 26, card_y + 20
    # Calendar body
    c_draw.rounded_rectangle([cal_x, cal_y + 4, cal_x + 24, cal_y + 26], radius=4, outline=(245, 215, 135, 255), width=2)
    # Header bar
    c_draw.rectangle([cal_x, cal_y + 4, cal_x + 24, cal_y + 11], fill=(245, 215, 135, 255))
    # Binder rings
    c_draw.line([(cal_x + 6, cal_y), (cal_x + 6, cal_y + 5)], fill=(255, 240, 185, 255), width=2)
    c_draw.line([(cal_x + 18, cal_y), (cal_x + 18, cal_y + 5)], fill=(255, 240, 185, 255), width=2)
    # Grid dots
    for gx in [cal_x + 6, cal_x + 12, cal_x + 18]:
        for gy in [cal_y + 16, cal_y + 21]:
            c_draw.rectangle([gx, gy, gx + 1, gy + 1], fill=(245, 215, 135, 220))
            
    # 2. Clock Icon at (left_x + 26, card_y + 68)
    clk_x, clk_y = left_x + 38, card_y + 80
    clk_r = 11
    c_draw.ellipse([clk_x - clk_r, clk_y - clk_r, clk_x + clk_r, clk_y + clk_r], outline=(245, 215, 135, 255), width=2)
    # Center dot
    c_draw.ellipse([clk_x - 1, clk_y - 1, clk_x + 1, clk_y + 1], fill=(245, 215, 135, 255))
    # Clock hands: 6 o'clock (down) and 12 (up)
    c_draw.line([(clk_x, clk_y), (clk_x, clk_y - 6)], fill=(255, 240, 185, 255), width=2)
    c_draw.line([(clk_x, clk_y), (clk_x + 4, clk_y + 4)], fill=(255, 240, 185, 255), width=2)
    
    # 3. Location Pin Icon at (left_x + 26, card_y + 118)
    pin_x, pin_y = left_x + 38, card_y + 126
    # Pin circle top
    c_draw.ellipse([pin_x - 8, pin_y - 8, pin_x + 8, pin_y + 8], outline=(245, 215, 135, 255), width=2)
    # Pin inner dot
    c_draw.ellipse([pin_x - 3, pin_y - 3, pin_x + 3, pin_y + 3], fill=(245, 215, 135, 255))
    # Pin triangle point
    c_draw.polygon([(pin_x - 5, pin_y + 5), (pin_x + 5, pin_y + 5), (pin_x, pin_y + 13)], fill=(245, 215, 135, 255))
    
    bg.paste(card_layer, (0, 0), card_layer)
    
    # Text items inside Card
    text_x = left_x + 64
    i1_y = card_y + 18
    text_draw.text((text_x, i1_y), "Saturday, 26th September 2026", font=font_outfit_bold, fill=(255, 250, 244))
    
    i2_y = i1_y + 40
    text_draw.text((text_x, i2_y), "6:00 PM – 8:00 PM onwards", font=font_outfit_detail, fill=(244, 220, 176))
    
    i3_y = i2_y + 38
    text_draw.text((text_x, i3_y), "Zaitoon Banquet Hall, Velachery, Chennai", font=font_outfit_detail, fill=(251, 238, 232))
    
    # Bottom callout: "www.shrishtiika.site  •  Tap to Open Invitation"
    bot_y = card_y + card_h + 16
    bot_pill_w = 460
    bot_pill_h = 36
    bot_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    b2_draw = ImageDraw.Draw(bot_layer)
    b2_draw.rounded_rectangle([left_x, bot_y, left_x + bot_pill_w, bot_y + bot_pill_h], radius=18, fill=(201, 170, 114, 40), outline=(201, 170, 114, 150), width=1)
    
    # Draw tiny star accents
    draw_star(b2_draw, left_x + 18, bot_y + 18, 5, (255, 230, 160, 230))
    draw_star(b2_draw, left_x + bot_pill_w - 18, bot_y + 18, 5, (255, 230, 160, 230))
    bg.paste(bot_layer, (0, 0), bot_layer)
    
    link_text = "www.shrishtiika.site   ·   Tap to Open Invitation"
    lbox = font_outfit_tag.getbbox(link_text)
    lw = lbox[2] - lbox[0]
    lh = lbox[3] - lbox[1]
    text_draw.text((left_x + (bot_pill_w - lw) // 2, bot_y + (bot_pill_h - lh) // 2 - 2), link_text, font=font_outfit_tag, fill=(244, 220, 176))
    
    # 7. Save Images
    # JPEG (optimal for WhatsApp/social - under 200KB)
    rgb_final = bg.convert("RGB")
    rgb_final.save("public/og-image.jpg", "JPEG", quality=90, optimize=True)
    rgb_final.save("app/opengraph-image.jpg", "JPEG", quality=90, optimize=True)
    # PNG version
    rgb_final.save("public/og-image.png", "PNG", optimize=True)
    rgb_final.save("app/opengraph-image.png", "PNG", optimize=True)
    
    print("Vector-perfect OG images created successfully!")

if __name__ == "__main__":
    create_og_image()
